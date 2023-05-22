import * as NestCommon from '@nestjs/common';
import * as NestMongoose from '@nestjs/mongoose';

import * as Mongoose from 'mongoose';

import * as Enums from 'common/enums'
import * as Schemas from 'core/schemas';

@NestCommon.Injectable()
export class RolesSeeder {
    constructor(@NestMongoose.InjectModel(Schemas.Role.name) private readonly roleModel: Mongoose.Model<Schemas.Role>) {}

    public async seed(): Promise<Schemas.Role[]> {
        const allPermissions = Object.values(Enums.RolePermission);

        const roles = [
            {
                name: 'admin',
                permissions: allPermissions,
            },
            {
                name: 'user',
                permissions: [Enums.RolePermission.USER_READ],
            },
        ];

        return await this.roleModel.insertMany(roles);
    }

    public async drop(): Promise<unknown> {
        return this.roleModel.deleteMany({});
    }
}
