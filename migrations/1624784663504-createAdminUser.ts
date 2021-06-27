import {MigrationInterface, QueryRunner} from "typeorm";
import * as uuid from 'uuid';
import bcrypt from 'bcrypt';

export class createAdminUser1624784663504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (id, login, name, password) VALUES ('${uuid.v4()}', 'admin', 'admin', '${await bcrypt.hash('admin', 10)}');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE from users WHERE name=admin`);
    }

}
