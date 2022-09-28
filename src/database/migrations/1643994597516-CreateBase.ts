import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBase1643994597516 implements MigrationInterface {
  name = 'CreateBase1643994597516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "image" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ALTER COLUMN "image" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "id" NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updated_at"`);
  }
}
