import { IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {

    status?: TaskStatus;

    @IsString()
    search?: string;

}