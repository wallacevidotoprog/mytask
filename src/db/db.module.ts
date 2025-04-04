import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [__dirname + '/entities/**'],
        migrations:[__dirname+'/migrations/*.ts'],
        synchronize:false
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
