import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1704454843414 implements MigrationInterface {
    name = 'Migration1704454843414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "note" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "note"
            SET NOT NULL
        `);
    }

}
