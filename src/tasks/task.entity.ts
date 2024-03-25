import { Column, Entity, PrimaryGeneratedColumn, DataSource } from "typeorm";
import { TaskStatus } from "./task-status.enum";


@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "title", type: "text", nullable: false })
    title: string

    @Column({ name: "description", type: "text", nullable: false })
    description: string

    @Column({ name: "status", type: "text", enum: TaskStatus, default: TaskStatus.OPEN })
    status: TaskStatus

}