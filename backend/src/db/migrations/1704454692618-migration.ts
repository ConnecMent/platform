import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1704454692618 implements MigrationInterface {
    name = 'Migration1704454692618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "timestamp"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "timestamp" bigint NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "timestamp"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "timestamp" integer NOT NULL
        `);
    }

}
