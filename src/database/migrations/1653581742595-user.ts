import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1653581742595 implements MigrationInterface {
  emailIDX = 'IDX_email_e12875dfb3b1d92d7d7c5377e2';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`user\` (
            \`id\` bigint UNSIGNED AUTO_INCREMENT,
            \`email\` varchar(255) NOT NULL,
            \`password\` varchar(100) NOT NULL,
            \`status\` tinyint NOT NULL COMMENT '1: Active, 0: Inactive' DEFAULT '1',
            \`is_super_admin\` tinyint NOT NULL DEFAULT '0',
            \`name\` varchar(255) NULL COMMENT "User's full name",
            \`role_id\` tinyint NOT NULL,
            \`refresh_token\` varchar(500) NULL,
            \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            UNIQUE INDEX \`${this.emailIDX}\` (\`email\`),
            PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
