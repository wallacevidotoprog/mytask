import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindAllParametes, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task);

    console.log(this.taskService.count());
    console.log(this.taskService.list());

    return this.taskService.list();
  }
  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findById(id);
  }
  @Get()
  fundAll(@Query() params: FindAllParametes): TaskDto[] {
    return this.taskService.findAll(params);
  }
  @Put()
  update(@Body() task: TaskDto) {
    this.taskService.update(task);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
