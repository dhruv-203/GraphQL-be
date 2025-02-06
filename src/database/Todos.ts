import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Status {
  in_progress = "in_progress",
  completed = "completed",
  pending = "pending",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "timestamp" })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "enum", enum: Status, enumName: "status" })
  status: Status;

  @Column({ type: "enum", enum: Priority, enumName: "priority" })
  priority: Priority;
}
