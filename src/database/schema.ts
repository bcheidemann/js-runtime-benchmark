import { mysqlTable, bigint, varchar, date } from 'drizzle-orm/mysql-core';
 
export const UsersTable = mysqlTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }),
  dateOfBirth: date('date_of_birth', { mode: 'string' }),
});
 