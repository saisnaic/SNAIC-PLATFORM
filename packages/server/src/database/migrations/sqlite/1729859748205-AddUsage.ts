import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsage1729859748205 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "usage" (
                "id" varchar PRIMARY KEY NOT NULL, 
                "chatflowid" varchar NOT NULL, 
                "chatid" text NOT NULL, 
                "runid" varchar, 
                "model" varchar, 
                "date" datetime NOT NULL DEFAULT (datetime('now')),
                "usage" number);`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "usage";`)
    }
}
