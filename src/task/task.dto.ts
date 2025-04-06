import { plainToInstance } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskEntity } from 'src/db/entities/task.entity';
export enum TaskStatusEnum {
  DONE = 'DONE',
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
}
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(500)
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: string;

  @IsDateString()
  expirationDate: Date;
}
export interface FindAllParametes {
  title: string;
  status: string;
}

export class TaskConvert {
  public static mapTaskEntityToDto(task: TaskEntity): TaskDto {
    return plainToInstance(TaskDto, task);
  }
  public static mapTaskDtoToEntity(task: TaskDto): Partial<TaskEntity> {
    return plainToInstance(TaskEntity, task);
  }
}

export class TaskRouteParameters {
  @IsUUID()
  id: string;
}
