import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1743803905737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE user (
                id TEXT NOT NULL PRIMARY KEY,
                username TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                CONSTRAINT user_un_username UNIQUE (username)
            );`
          );
          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`);
    }

}
