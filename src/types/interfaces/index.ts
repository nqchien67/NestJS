import { TokenType, UserType } from '$types/enums';
import { UpsertType } from 'typeorm/driver/types/UpsertType';

export interface ITokenPayload {
  id: number;
  userType: UserType;
  tokenType?: TokenType;
  [key: string]: any;
}
