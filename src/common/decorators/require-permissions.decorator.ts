import * as NestCommon from '@nestjs/common';

import * as Enums from 'common/enums';
import * as Constants from "common/constants";

export const RequirePermissions = function (...permissions: Enums.RolePermission[]): MethodDecorator {
    return NestCommon.SetMetadata(Constants.PERMISSION_KEY, permissions);
};
