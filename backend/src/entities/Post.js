import { EntitySchema } from "typeorm";

export const Post = new EntitySchema({
  name: "Post",
  tableName: "posts",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    content: {
      type: "text",
      nullable: false,
    },
    image: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
