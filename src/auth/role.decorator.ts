import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export type AllowedRole = keyof typeof UserRole | 'ANY';

export const Role = (roles: AllowedRole[]) => SetMetadata('roles', roles);
