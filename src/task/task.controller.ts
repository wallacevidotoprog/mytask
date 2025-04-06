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
import { FindAllParametes, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDto) {
    return await this.taskService.create(task);
  }
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findById(id);
  }
  @Get()
  async fundAll(@Query() params: FindAllParametes): Promise<TaskDto[]> {
    return await this.taskService.findAll(params);
  }
  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    this.taskService.update(params.id,task);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
