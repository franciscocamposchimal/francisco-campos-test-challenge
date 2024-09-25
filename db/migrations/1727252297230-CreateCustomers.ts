import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomers1727252297230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "customerId" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8d2f3f3f3f9b1e0f3f3f3f3f3f3" UNIQUE ("customerId"), CONSTRAINT "UQ_651f3f3f3f3f3f3f3f3f3f3f3" UNIQUE ("email"), CONSTRAINT "PK_3b8b97af7aac91e1e2f6f4f6e7e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
