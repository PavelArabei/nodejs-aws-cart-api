import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersCartsCartsItemsOrders1721840306611 implements MigrationInterface {
    name = 'UsersCartsCartsItemsOrders1721840306611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cart_id" uuid NOT NULL, "product_id" uuid NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_0585b0c8594d105d1e3f0dffd30" PRIMARY KEY ("id", "cart_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."carts_status_enum" AS ENUM('OPEN', 'ORDERED')`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."carts_status_enum" NOT NULL DEFAULT 'OPEN', CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('CREATED', 'SHIPPED')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "cart_id" uuid NOT NULL, "delivery" json NOT NULL, "payment" json NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'CREATED', CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_c99a206eb11ad45f6b7f04f2dcc" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_c99a206eb11ad45f6b7f04f2dcc"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TYPE "public"."carts_status_enum"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
    }

}
