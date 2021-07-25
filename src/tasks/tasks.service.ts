import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { nanoid } from 'nanoid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: nanoid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): Task | string {
    const foundTask = this.tasks.find((task) => task.id === id);
    if (foundTask) {
      const newTasks = this.tasks.filter((task) => task.id !== id);
      this.tasks = [...newTasks];
      return foundTask;
    }
    return 'Task not found';
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const foundTask = this.tasks.find((task) => task.id === id);
    foundTask.status = status;
    return foundTask;
  }

  getTasksWithFilter(filterDto: GetTasksFilter): Task[] {
    const { search, status } = filterDto;

    //Define a temporary array to hold the result
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }
}
