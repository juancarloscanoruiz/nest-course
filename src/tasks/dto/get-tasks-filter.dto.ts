import { TaskStatus } from '../tasks.model';

export class GetTasksFilter {
  status?: TaskStatus;
  search?: string;
}
