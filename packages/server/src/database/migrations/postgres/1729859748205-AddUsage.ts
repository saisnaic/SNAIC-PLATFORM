import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsage1729859748205 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS usage (
                        id uuid NOT NULL DEFAULT uuid_generate_v4() primary key,
                        "chatflowid" varchar NOT NULL, 
                        "chatid" varchar NOT NULL, 
                        "runid" varchar, 
                        "model" varchar, 
                        "date" timestamp NOT NULL DEFAULT now(),
                        "usage" integer
                        );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE usage`)
    }
}
