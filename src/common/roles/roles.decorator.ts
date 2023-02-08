import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from '../../user/user.dto';

export const Roles = (...roles: UserRolesEnum[]) => SetMetadata('roles', roles);
