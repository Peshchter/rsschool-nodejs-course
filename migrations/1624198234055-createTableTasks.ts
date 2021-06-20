import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableTasks1624198232055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "tasks",
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
                    name: "order",
                    type: "integer",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "boardId",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "columnId",
                    type: "varchar",
                    isNullable: true
                },

            ]
            }
        ), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks");
    }

}
