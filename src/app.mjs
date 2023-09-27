import { createElement as Element} from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';

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

async function Table() {
  const users = await new Promise((resolve) => {
    setTimeout(() => {
      // Generate 100 users with random ages and names
      const users = Array.from({ length: 100 }, () => ({
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        age: Math.floor(Math.random() * 100),
        id: Date.now().toString(36),
      }));

      resolve(users);
    }, 170);
  });

  return Element(
    'table',
    null,
    Element(
      'thead',
      null,
      Element(
        'tr',
        null,
        Element('th', null, 'Name'),
        Element('th', null, 'Age'),
      ),
    ),
    Element(
      'tbody',
      null,
      users.map((user) =>
        Element(
          'tr',
          { key: user.id },
          Element('td', null, user.name),
          Element('td', null, user.age),
        ),
      ),
    ),
  );
}

const app = express();

app.get('/', async (req, res) => {
  const html = renderToString(
    Element(
      'html',
      null,
      Element(
        'head',
        null,
        Element('title', null, 'Hello World'),
        Element('meta', { charSet: 'utf-8' })
      ),
      Element(
        'body',
        null,
        Element('h1', { style: { fontSize: '20px' } }, 'Hello World'),
        Element('span', { style: { fontSize: '16px' } }, 'This is a simple server side rendered React app'),
        Element('br', null, null),
        Element('code', null, req.headers['user-agent']),
        await Table(),
      ),
    ),
  );
  res.send(html);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
