import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class createTableBoards1624198232055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "boards",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: 'columns',
                    type: 'jsonb',
                    default: null,
                    isNullable: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("boards", true);
    }

}
