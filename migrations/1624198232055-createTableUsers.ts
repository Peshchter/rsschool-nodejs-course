import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableUsers1624198232055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users (
            id varchar PRIMARY KEY,
            login varchar,
            name varchar, 
            password varchar ) `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
