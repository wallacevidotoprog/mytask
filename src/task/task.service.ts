import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FindAllParametes, TaskDto, TaskStatusEnum } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(task: TaskDto) {
    task.id = uuidv4();
    task.status = task.status ?? TaskStatusEnum.TO_DO;
    this.tasks.push(task);
  }
  count(): number {
    return this.tasks.length;
  }
  list(): TaskDto[] {
    return this.tasks;
  }

  findById(id: string): TaskDto {
    const fT = this.tasks.filter((t) => t.id === id);

    if (fT.length) {
      return fT[0];
    }
    throw new HttpException('Task id not found', HttpStatus.NOT_FOUND);
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }
    throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }
  findAll(params: FindAllParametes): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;
      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }
      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }
      return match;
    });
  }
}
