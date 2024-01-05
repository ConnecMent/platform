import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1704445583002 implements MigrationInterface {
    name = 'Migration1704445583002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "id" SERIAL NOT NULL,
                "amount" integer NOT NULL,
                "note" character varying NOT NULL,
                "timestamp" integer NOT NULL,
                "fromUsername" character varying,
                "toUsername" character varying,
                CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "username" character varying NOT NULL,
                "password" character varying,
                "balance" integer NOT NULL,
                "isAdmin" boolean NOT NULL,
                "token" character varying,
                CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_5c4d6515439518524ed500dff03" FOREIGN KEY ("fromUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_27f883308228e5a33c3b5259f31" FOREIGN KEY ("toUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_27f883308228e5a33c3b5259f31"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_5c4d6515439518524ed500dff03"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
    }

}
