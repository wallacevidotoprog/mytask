import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
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
