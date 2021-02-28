# Learning Server-Side-Rendering (Next.js)

in this repo I follow the tutorial by [Bruno Antunes](https://www.youtube.com/channel/UCyU0mNYdX9EHY7rc5yucIZA) The video course you can find [here](https://www.youtube.com/playlist?list=PLYSZyzpwBEWSQsrukurP09ksi49H9Yj40). In the end there will be a car trading app, showing all the features of the tutorial. Afterwards you find my learnings.

you can find the distributed app [here]()

## my learnings through the tutorial

### Routing in Next.js

static routes are automatically included by creating folders and files in the page folder

    pages/vehicle/opel.js --> http://localhost:3000/vehicle/opel

dynamic routes can be created by simply close the name in [] brackets

    pages/[vehicle]/[type] --> this creates two variables "vehicle" & "type"

reading it in the function works like that

```js
import { useRouter } from "next/router";

export default function Person() {
  const router = useRouter();
  return (
    <h2>
      {router.query.person}´s {router.query.vehicle}
    </h2>
  );
}
```

links are build like that, even dynamically

```js
import Link from "next/link";

export default function Details() {
  return (
    <div>
      <Link as="/car/bruno" href="/[vehicle]/[person]">
        <a>Details: Bruno`car</a>
      </Link>
    </div>
  );
}
```

```js
...
const peoples = [
    {vehicle: "car1", person: "person1"},
    {vehicle: "car2", person: "person2"},
    {vehicle: "car3", person: "person3"},
]
...
{peoples.map(people => {
    <Link as={`/${people.vehicle}/${people.person}`} href="/[vehicle]/[person]">
    ...
})}
```

### 2. getInitialProps

it`s creating properties for rendering a page on the server side, f.e. a async-data-fetch from a database

```js
export function List({ ownersList }) {
  const router = useRouter();
  return <pre>{JSON.stringify(ownersList, null, 4)}</pre>;
}

List.getInitialProps = async () => {
  const response = await fetch("http://localhost:4001/vehicles");
  const ownersList = await response.json();

  return { ownersList };
};
```

dynamic routes used in server-side rendering <br/>
f.e. http://localhost:3000/car/guy <br/>
!!! There will be no rerouting until the data is fetched and passed to the List function -> you stay on the site where you navigating from

```js

export default function List ({ownersList}) {
 return (
  {ownerslist.map(owner => {
    ...
  })}
 )
}


List.getInitialProps = async (context) => {

  const { query } = context;

  const response = await fetch(`http://localhost:4001/vehicles?ownername=${query.person}+vehicle=${query.vehicle}`);
  const ownersList = await response.json();

    return {ownersList}
}
```

### 3. typescript conversion

shortform of using undefined, some shortcuts using ? or type-definition

```ts
interface Person {
  name: AnotherPerson | undefined;
}

or;

interface Person {
  name?: AnotherPerson;
}

or;

type PersonUndefinded = AnotherPerson | undefined;

interface Person {
  name: PersonUndefinded;
}
```

```ts
// defines the properties of the passed object
export interface ListProps {
  ownsersList: VerhiclePerson [] | undefined
}

export default function List ({ownersList}: ListProps) {
 return (
  {ownerslist?.map(owner => {
    ...
  })}
 )
}

// defines the response object
export interface VehiclePerson {
  details: string,
  ownerName: string,
  vehicle: string,
}

// specify more precise the query property of the build in NextJS
export interface MyNextPageContext extends NextPageContent {
  query: {
    person: string,
    vehicle: string,
  }
}


List.getInitialProps = async (context: MyNextPageContext) => {

  const { query } = context;

  const response = await fetch(`http://localhost:4001/vehicles?ownername=${query.person}+vehicle=${query.vehicle}`);
  // because it's async code, it have to provide the return object and undefined (because we didnt know for sure)
  const ownersList: VehiclePerson[] | undefinded = await response.json();

    return {ownersList}
}
```

### 4. api routes / sql query

creating api routes work the same like regular page routings

```ts
// importing nextjs types for request/ response
import { NextApiRequest, NextApiResponse } from "next";

// default is needed ti work correct
export default function getAllVehicles(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // to check the correct api http method, you have to do it manually & deny everything else
  if (request.method !== "GET") {
    response
      .status(500)
      .json({ code: 500, message: "wrong http request method" });
  }

  response.json({ hello: "world", method: request.method });
}
```

you can use the query in the api routing like in pages

```ts
response.json({ byID: request.query.id });
```

### 4.1. !!! SITENOTE !!!

because the tutorial seems to use outdated sqlite code you have to change the code in the database-test.js file to the following

database-test.js - from:

```js
const sqlite = require("sqlite");

async function setup() {
  try {
    const db = await sqlite.open("./mydb.sqlite");
    await db.migrate({ force: "last" });
  } catch (error) {
    console.error(error.message);
  }
}

setup();
```

database-test.js - to:

```js
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function openDB() {
  return open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await openDB();
  await db.migrate({ force: "last" });

  const people = await db.all("SELECT * FROM person");
  console.log({ type: "ALL PEOPLE", result: JSON.stringify(people) });
}

setup();
```

### 4.2. creating a sqlite database

1. install dependencies

   ```node
   npm install sqlite
   npm install sqlite3
   npm install @types/sqlite3
   ```

2. creating a folder "migrations"
3. writing the sql code to setup the "database" (see above, database-test.js)
4. write a node js script to build and test the database

post method in a route

```ts
...

if (request.method === "PUT") {
  const statement = await db.prepare("UPDATE person SET name=?, email=? where id=?");
  const result = await statement.run(request.body.name, request.body.email, request.body.id);
  result.finalize();
}

...
```

because the sqlite using the third iteration the tutorial code changes to:

```ts
const db = await sqlite.open({
  filename: "./mydb.sqlite",
  driver: sqlite3.Database,
});
const people = await db.all("select * from person");

response.json(people);
```

### 5. Material UI

recommended way to use fetch server-side and client-side

```js
import fetch from "isomorphic-unfetch";
...
```

### 6. Authentication & middleware in next.js

sources:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [bcrypt types](https://www.npmjs.com/package/@types/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [jsonwebtoken types](https://www.npmjs.com/package/@types/jsonwebtoken)

```node
npm install bcrypt jsonwebtoken && install --save-dev @types/bycrypt @types/jsonwebtoken
```

middleware is explicite used by the developer in every route 🥲

```ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
...
// authentication middleware
export const authenticated = (fn: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // if the JWT is offered and correct, the next function will be called = next in express.js
    verify(req.headers.authorization, "JWT_SECRET", async function(err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(500).json({code: 500, message: "Authentication failed"})
    })

}
```
