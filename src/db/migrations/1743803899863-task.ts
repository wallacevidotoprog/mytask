import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1743803899863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE task (
                id TEXT NOT NULL PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL DEFAULT 'TO_DO',
                expiration_date TEXT NOT NULL
            );`
          );
          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS task;`);
    }

}
