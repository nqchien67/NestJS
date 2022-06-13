import { AuthService } from '$app/shared/auth/auth.service';
import User from '$database/entities/user';
import { CustomHttpException } from '$helpers/exception';
import { CommonStatus, ErrorCode, UserType } from '$types/enums';
import config from '$config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { MailService } from '$app/shared/mail/mail.service';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(params: LoginDto) {
    const { email } = params;

    return this.connection.transaction(async (transaction) => {
      const userRepository = transaction.getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
        select: ['id', 'name', 'status', 'password', 'isSuperAdmin', 'userType'],
      });

      if (!user) {
        throw new CustomHttpException(ErrorCode.Not_Found, 'Not found user!');
      }
      if ((await user).status === CommonStatus.INACTIVE) {
        throw new CustomHttpException(ErrorCode.User_In_Active, 'User inactive');
      }

      const code = Math.floor(1000 + Math.random() * 9000).toString();
      await userRepository.update({ email }, { verificationCode: code });

      this.mailService.sendMail(email, 'Account Verification', 'verify-login', {
        name: user.name || email,
        code,
      });

      return email;
    });

    /*
    return await this.connection.transaction(async (transaction) => {
      const userRepository = transaction.getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
        select: ['id', 'status', 'refreshToken', 'password', 'isSuperAdmin', 'userType'],
      });

      if (!user) {
        throw new CustomHttpException(ErrorCode.Not_Found, 'Not found user!');
      }

      // TODO check active co the luu vao cache check o guard
      if (user.status === CommonStatus.INACTIVE) {
        throw new CustomHttpException(ErrorCode.User_In_Active, 'User inactive');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) throw new CustomHttpException(ErrorCode.Auth_Failed);

      // TODO return token
      return await this.generateToken(userRepository, user);
    });*/
  }

  async adminLogin(body: any) {
    const email = body.email;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id'],
    });

    return await this.generateToken(this.userRepository, user);
  }

  async register(params: RegisterDto) {
    const email = params.email;

    return await this.connection.transaction(async (transaction) => {
      const userRepository = transaction.getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
        select: ['id'],
      });

      if (user) {
        throw new CustomHttpException(ErrorCode.Email_Already_exist, 'Email already exist');
      }

      const code = Math.floor(1000 + Math.random() * 9000).toString();
      const data = {
        email,
        status: CommonStatus.INACTIVE,
        roleId: UserType.CLIENT,
        verificationCode: code,
      };

      await userRepository.save(data);
      this.mailService.sendMail(email, 'Verify your email address.', 'verify-register', {
        name: email,
        code,
      });

      return email;
    });
  }

  async verifyEmail(params: VerifyEmailDto) {
    const { email, password, code } = params;

    return await this.connection.transaction(async (transaction) => {
      const userRepository = transaction.getRepository(User);

      const user = await userRepository.findOne({
        where: { email },
        select: ['verificationCode', 'status', 'password'],
      });

      if (!user) {
        throw new CustomHttpException(ErrorCode.Not_Found, 'User not found');
      }

      if (user.verificationCode !== code) {
        throw new CustomHttpException(ErrorCode.Auth_Failed, 'Auth_Failed');
      }

      if (user.status === CommonStatus.INACTIVE) {
        await this.verifyRegister(userRepository, email, password);
      } else {
        await this.verifyLogin(password, user.password);
      }

      return this.generateToken(userRepository, user);
    });
  }

  private async verifyRegister(userRepository: Repository<User>, email: string, password: string) {
    const hashPassword = await bcrypt.hash(password, config.AUTH.BCRYPT_HASH_ROUNDS);
    await userRepository.update(
      { email },
      {
        password: hashPassword,
        verificationCode: '',
        status: CommonStatus.ACTIVE,
      },
    );
  }

  private async verifyLogin(password: string, storedPassword: string) {
    const isPasswordCorrect = await bcrypt.compare(password, storedPassword);
    if (!isPasswordCorrect) {
      throw new CustomHttpException(ErrorCode.Auth_Failed);
    }
  }

  async generateToken(userRepository: Repository<User>, user: User) {
    const payload = { id: user.id, userType: user.userType };
    console.log(payload);
    const token = this.authService.generateAccessToken(payload);

    const isValid = this.authService.verifyRefreshToken(user.refreshToken);

    if (!isValid) {
      const newRefreshToken = this.authService.generateRefreshToken(payload);

      await userRepository.update({ id: user.id }, { refreshToken: newRefreshToken });

      return { token, refreshToken: newRefreshToken };
    }

    return { token, refreshToken: user.refreshToken };
  }

  async findAllEmail() {
    const users = await this.userRepository.find({ select: ['email'] });
    return users.map((user) => user.email);
  }

  findAll() {}

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
