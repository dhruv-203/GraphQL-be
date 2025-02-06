import { AppDataSource } from "../database/db.js";
import { Priority, Status, Todos } from "../database/Todos.js";
export const resolver = {
  Query: {
    todos: async (
      _: any,
      {
        filterBy,
        sortBy,
      }: {
        filterBy: {
          status: Status | null;
          priority: Priority | null;
        } | null;
        sortBy: {
          [key: string]: "ASC" | "DESC";
        };
      }
    ) => {
      let data: Todos[] = [];
      if (!filterBy) {
        data = await AppDataSource.getRepository(Todos).find({
          order: {
            ...sortBy,
          },
        });
      } else if (filterBy.priority === null && !filterBy.status === null) {
        data = await AppDataSource.getRepository(Todos).find({
          order: {
            ...sortBy,
          },
        });
      } else if (filterBy.priority !== null && filterBy.status === null) {
        data = await AppDataSource.getRepository(Todos).find({
          where: {
            priority: filterBy.priority,
          },
          order: {
            ...sortBy,
          },
        });
      } else if (filterBy.priority === null && filterBy.status !== null) {
        data = await AppDataSource.getRepository(Todos).find({
          where: {
            status: filterBy.status,
          },
          order: {
            ...sortBy,
          },
        });
      } else {
        data = await AppDataSource.getRepository(Todos).find({
          where: {
            priority: filterBy.priority,
            status: filterBy.status,
          },
          order: {
            ...sortBy,
          },
        });
      }
      const newData = data.map((todo) => ({
        ...todo,
        due_date: `${todo.due_date.toLocaleString()}`,
        created_at: `${todo.created_at.toLocaleString()}`,
      }));
      return newData;
    },
    todoById: async (_: any, { id }: { id: number }) => {
      if (!id || isNaN(+id)) {
        throw new Error("Invalid id");
      }
      const todo = await AppDataSource.getRepository(Todos).findOne({
        where: { id },
      });
      if (!todo) {
        throw new Error("Todo not found");
      }
      const newData = {
        ...todo,
        due_date: `${todo.due_date.getFullYear()}-${
          todo.due_date.getMonth() < 9
            ? `0${todo.due_date.getMonth() + 1}`
            : todo.due_date.getMonth() + 1
        }-${
          todo.due_date.getDate() < 10
            ? `0${todo.due_date.getDate()}`
            : todo.due_date.getDate()
        }, ${todo.due_date.toTimeString()}`,
        created_at: `${todo.created_at.getFullYear()}-${
          todo.created_at.getMonth() < 9
            ? `0${todo.created_at.getMonth() + 1}`
            : todo.created_at.getMonth() + 1
        }-${
          todo.created_at.getDate() < 10
            ? `0${todo.created_at.getDate()}`
            : todo.created_at.getDate()
        }, ${todo.created_at.toTimeString()}`,
      };
      return newData;
    },
  },
  Mutation: {
    createTodo: async (
      _: any,
      {
        title,
        description,
        due_date,
        status,
        priority,
      }: {
        title: string;
        description: string;
        due_date: string;
        status: Status;
        priority: Priority;
      }
    ) => {
      // const dueDate = new Date(parseDate(due_date));
      const newTodo = AppDataSource.getRepository(Todos).create({
        title,
        description,
        due_date: new Date(due_date),
        status,
        priority,
      });
      await AppDataSource.getRepository(Todos).save(newTodo);
      return {
        message: "Todo created successfully",
        success: true,
      };
    },
    updateTodo: async (
      _: any,
      {
        id,
        title,
        description,
        due_date,
        status,
        priority,
      }: {
        id: number;
        title: string;
        description: string;
        due_date: string;
        status: Status;
        priority: Priority;
      }
    ) => {
      const updatedTodo = await AppDataSource.getRepository(Todos).findOne({
        where: {
          id: id,
        },
      });
      if (!updatedTodo) {
        throw new Error("Todo not found");
      }
      // validate the fields that are being updated, according to their names, and the type provided in schema
      // if the field is not provided, it will throw an error
      // if the type is not correct, it will throw an error
      if (!title || !description || !due_date || !status || !priority) {
        throw new Error("Empty field no allowed");
      }

      updatedTodo.title = title;
      updatedTodo.description = description;
      updatedTodo.due_date = new Date(due_date);
      updatedTodo.status = status;
      updatedTodo.priority = priority;
      await AppDataSource.getRepository(Todos).save(updatedTodo);
      return {
        message: "Todo updated successfully",
        success: true,
      };
    },
    deleteTodo: async (_: any, { id }: { id: number }) => {
      const deletedTodo = await AppDataSource.getRepository(Todos).findOne({
        where: { id },
      });

      if (!deletedTodo) {
        throw new Error("Todo not found");
      }

      await AppDataSource.getRepository(Todos).remove(deletedTodo);
      return {
        message: "Todo deleted successfully",
        success: true,
      };
    },
  },
};
