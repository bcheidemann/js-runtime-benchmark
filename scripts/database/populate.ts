import { db } from "../../src/database/client";
import { UsersTable } from "../../src/database/schema";

const NAMES = [
  'John',
  'Jane',
  'Jack',
  'Jill',
  'Joe',
  'Jenny',
  'Jerry',
  'Judy',
  'Jeff',
  'Jasmine',
  'James',
  'Jade',
  'Jasper',
  'Jocelyn',
  'Jude',
  'Julia',
  'Julian',
  'Jocasta',
  'Jupiter',
  'Juno',
];

const LAST_NAMES = [
  "O'Neil",
  'Smith',
  'Johnson',
  'Williams',
  'Jones',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
  'Moore',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Garcia',
  'Martinez',
  'Robinson',
  'Clark',
  'Rodriguez',
  'Lewis',
  'Lee',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'Hernandez',
  'King',
  'Wright',
  'Lopez',
  'Hill',
  'Scott',
  'Green',
  'Adams',
  'Baker',
  'Gonzalez',
  'Nelson',
  'Carter',
  'Mitchell',
  'Perez',
];

async function main() {
  const newUsers = Array.from({ length: 1000 }).map(() => ({
    dateOfBirth: new Date(
      Date.now()
        - 3000000000000
        + Math.floor(Math.random() * 1000000000000)
    ).toISOString().split("T")[0],
    firstName: NAMES[Math.floor(Math.random() * NAMES.length)],
    lastName: LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)],
  }));

  await db.insert(UsersTable).values(newUsers).execute();
}

main();
