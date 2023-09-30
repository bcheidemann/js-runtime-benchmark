import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';

import { db } from './database/client.ts';
import { UsersTable } from './database/schema.ts';

async function Table() {
  const userRecords = await db
    .select()
    .from(UsersTable)
    .limit(100)
    .execute();
  
  const users = userRecords.map((user) => ({
    id: user.id,
    name: user.firstName + ' ' + user.lastName,
    age: (new Date().getTime() - new Date(user.dateOfBirth!).getTime()) / 1000 / 60 / 60 / 24 / 365,
  }));

  return (
    <>
      <p>
        There are <b>{userRecords.length}</b> users in the table below with an average age of{' '}
        <b>{Math.round(users.reduce((sum, user) => sum + user.age, 0) / userRecords.length)}</b>.
      </p>
      <table style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{Math.floor(user.age)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const app = express();

app.get('/', async (req, res) => {
  const html = renderToString(
    <html>
      <head>
        <title>Javascript Runtime Benchmark</title>
        <meta charSet='utf-8'></meta>
        <style>
          {`
            table {
              border-collapse: collapse;
              border: 1px solid #ccc;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
            }
            body {
              background-color: #444;
              padding: 20px;
            }
          `}
        </style>
      </head>
      <body>
        <main style={{
          margin: '0 auto',
          maxWidth: '800px',
          padding: '20px',
          backgroundColor: '#eee',
          borderRadius: '4px',
          textAlign: 'center',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 12px',
        }}>
          <h1 style={{ fontSize: '20px' }}>JavaScript Runtime Performance Benchmark</h1>
          <p style={{ fontSize: '16px', padding: '0 40px' }}>
            This is a simple server side rendered React app.
            It renders a table with 100 rows and 2 columns.
            The table is generated on the server and sent to
            the client as HTML. The data displayed in the table
            is randomly generated on the server, using a Promise
            to simulate a network request. This is a very simple
            benchmark to compare the performance of different
            JavaScript runtimes.
          </p>
          {await Table()}
        </main>
      </body>
    </html>
  );
  res.send(html);
});

app.listen(3000, () => console.log('Listening on http://0.0.0.0:3000'));
