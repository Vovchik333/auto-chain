import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'src/config';

const { host, port, name, type } = config.db;
const uri = `${type}://${host}:${port}/${name}`;

@Module({
  imports: [MongooseModule.forRoot(uri)]
})
export class DatabaseModule {}
