import { ConfigService } from '@nestjs/config';
import {config} from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';
config();

const configService = new ConfigService();
const dataSourceOptions : DataSourceOptions ={
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [TaskEntity,UserEntity],
    migrations:[__dirname+'/migrations/*.ts'],
    synchronize:false
}

export default new DataSource(dataSourceOptions)