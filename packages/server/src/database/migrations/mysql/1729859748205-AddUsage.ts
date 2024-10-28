import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsage1729859748205 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS \`usage\`
       (
           \`id\`         varchar(36)  NOT NULL,
           \`chatflowid\` varchar(255) NOT NULL,
           \`chatid\`     varchar(255) NOT NULL,
           \`runid\`      varchar(255),
           \`model\`      varchar(255),
           \`date\`       datetime(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
           \`usage\`      integer,
           PRIMARY KEY (\`id\`)
       ) ENGINE = InnoDB
         DEFAULT CHARSET = utf8mb4
         COLLATE = utf8mb4_0900_ai_ci;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE usage`)
    }
}
