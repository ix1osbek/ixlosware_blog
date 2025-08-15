import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Admin",
  tableName: "admins",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    username: {
      type: "varchar",
      unique: true,
    },
    passwordHash: {
      type: "varchar",
    },
  },
});
