import { AuthService } from '$app/shared/auth/auth.service';
import User from '$database/entities/user';
import { CustomHttpException } from '$helpers/exception';
import { CommonStatus, ErrorCode, UserType } from '$types/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(params: LoginDto) {
    const { email, password } = params;

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
    });
  }

  async register(params: RegisterDto) {
    const { email, password, code } = params;

    return await this.connection.transaction(async (transaction) => {
      const userRepository = transaction.getRepository(User);

      
    });
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

  findAll() {
    return `This action returns all auth`;
  }

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
