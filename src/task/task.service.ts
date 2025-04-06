import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FindAllParametes, TaskConvert, TaskDto, TaskStatusEnum } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  private tasks: TaskDto[] = [];
  async create(task: TaskDto) {
    const taksToSave: TaskEntity = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
      status: task.status ?? TaskStatusEnum.TO_DO,
      expirationDate: task.expirationDate,
    };
    const createdTask = await this.taskRepository.save(taksToSave);

    return TaskConvert.mapTaskEntityToDto(createdTask);
  }
  count(): number {
    return this.tasks.length;
  }
  list(): TaskDto[] {
    return this.tasks;
  }

  async findById(id: string): Promise<TaskDto> {
    const taskFind = await this.taskRepository.findOne({
      where: { id: id },
    });

    if (taskFind) {
      return TaskConvert.mapTaskEntityToDto(taskFind);
    }
    throw new HttpException('Task id not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, task: TaskDto) {
    const taskExist = await this.findById(id);

    if (!taskExist) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }

    await this.taskRepository.update(id,TaskConvert.mapTaskDtoToEntity(task));

    return;
  }

  async remove(id: string) {
    const taskExist = await this.findById(id);
    if (!taskExist) {
      throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
    }
    await this.taskRepository.delete(id);
    return;
  }
  async findAll(params: FindAllParametes): Promise<TaskDto[]> {
    const searchParams: FindOptionsWhere<TaskEntity>={}

    const searchPrams: FindOptionsWhere<TaskEntity> = {}

    if (params.title) {
      searchPrams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchPrams.status = Like(`%${params.status}%`);
    }

    const tasksFound = await this.taskRepository.find({
      where: searchPrams
    });

    return tasksFound.map((t) => {
      return TaskConvert.mapTaskEntityToDto(t);
    });
  }
}
