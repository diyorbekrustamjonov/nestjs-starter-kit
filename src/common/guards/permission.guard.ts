import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';
import * as NestPassport from '@nestjs/passport';

import * as Constants from 'common/constants';
import * as Enums from 'src/common/enums';

@NestCommon.Injectable()
export class PermissionsGuard extends NestPassport.AuthGuard('jwt') {
    constructor(private reflector: NestCore.Reflector) {
        super();
    }

    public async canActivate(context: NestCommon.ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const requiredPermissions = this.reflector.getAllAndOverride<Enums.RolePermission[]>(
            Constants.PERMISSION_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredPermissions) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        return requiredPermissions.some((permission) => user.role.permissions?.includes(permission));
    }
}
