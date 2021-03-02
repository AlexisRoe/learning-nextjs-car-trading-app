# Learning Server-Side-Rendering (Next.js)

in this repo I follow the tutorial by [Bruno Antunes](https://www.youtube.com/channel/UCyU0mNYdX9EHY7rc5yucIZA) The video course you can find [here](https://www.youtube.com/playlist?list=PLYSZyzpwBEWSQsrukurP09ksi49H9Yj40). In the end there will be a car trading app, showing all the features of the tutorial. Afterwards you find my learnings.

you can find the distributed app [here]() - (coming soon)

**There are two branches**

1. [main branch](https://github.com/AlexisRoe/learning-nextjs-car-trading-app/blob/main) = basic next.js Tutorial, based on [my next.js-starter-template](https://github.com/AlexisRoe/next.js-template) (which is based on the [nextjs-starter](https://github.com/lmachens/next.js-template) by [lmachens](@lmachens))
2. [trading branch](https://github.com/AlexisRoe/learning-nextjs-car-trading-app/blob/trading) = contains the tutorial for the car trading app based on the code [here](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-1) (coming soon)

## Topics

- [1. Routing in Next.js](#1.-Routing-in-Next.js)
- [2. getInitialProps](#2.-getInitialProps)
- [3. typescript conversion](#3.-typescript-conversion)
- [4. api routes and sql query](#4.-api-routes-and-sql-query)
- [4.1. SITE NOTE](#4.1.-SITE-NOTE)
- [4.2. creating a sqlite database](#4.2.-creating-a-sqlite-database)
- [5. Material UI](#5.-Material-UI)
- [6. Authentication & middleware in next.js](#6.-Authentication-&-middleware-in-next.js)
- [7. Consume protected API Routes](#7.-Consume-protected-API-Routes)
- [8. getStaticProps and getStaticPath](#8.-getStaticProps-and-getStaticPath)
- [9. DataFetching with getServerSideProps](#9.-DataFetching-with-getServerSideProps)
- [10. env and runtime config](#10.-env-and-runtime-config)
- [image optimization](#image-optimization)
- [api routes using next-connect](#api-routes-using-next-connect)

## Github Sources

- [Basic Tutorial - Part 1](https://github.com/bmvantunes/youtube-2020-feb-nextjs-part1);
- [Basic Tutorial - Part 2](https://github.com/bmvantunes/youtube-2020-feb-nextjs-part2);
- [Basic Tutorial - Part 3](https://github.com/bmvantunes/youtube-2020-march-nextjs-part3);
- [Basic Tutorial - Part 4](https://github.com/bmvantunes/youtube-2020-march-nextjs-part4);
- [Basic Tutorial - Part 5](https://github.com/bmvantunes/youtube-2020-march-nextjs-part5);
- [Basic Tutorial - Part 6](https://github.com/bmvantunes/youtube-2020-march-nextjs-part6);
- [Basic Tutorial - Part 7](https://github.com/bmvantunes/youtube-2020-march-nextjs-part7);
- [Basic Tutorial - Part 8](https://github.com/bmvantunes/youtube-2020-april-nextjs-part8);
- [Basic Tutorial - Part 9](https://github.com/bmvantunes/youtube-2020-april-nextjs-part9);
- [Basic Tutorial - Part 10](https://github.com/bmvantunes/youtube-2020-april-nextjs-part10);
- [Car Trading App - Part 1](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-1)
- [Car Trading App - Part 2](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-2)
- [Car Trading App - Part 3](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-3)
- [Car Trading App - Part 4](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-4)
- [Car Trading App - Part 5](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-5)
- [Car Trading App - Part 6](https://github.com/bmvantunes/youtube-2020-may-building-a-car-trader-app-6)

## my learnings through the tutorial

### 1. Routing in Next.js

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
  {ownersList.map(owner => {
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

short form of using undefined, some shortcuts using ? or type-definition

```ts
interface Person {
  name: AnotherPerson | undefined;
}

or;

interface Person {
  name?: AnotherPerson;
}

or;

type PersonUndefined = AnotherPerson | undefined;

interface Person {
  name: PersonUndefined;
}
```

```ts
// defines the properties of the passed object
export interface ListProps {
  ownersList: VehiclePerson [] | undefined
}

export default function List ({ownersList}: ListProps) {
 return (
  {ownersList?.map(owner => {
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
  // because it's async code, it have to provide the return object and undefined (because we didn't know for sure)
  const ownersList: VehiclePerson[] | undefined = await response.json();

    return {ownersList}
}
```

### 4. api routes and sql query

creating api routes work the same like regular page routings

```ts
// importing next.js types for request/ response
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

### 4.1. SITE NOTE

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

You can find the documentation: [here](https://sqlite.org/index.html)

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

You can find the documentation: [here](https://material-ui.com/)

```node
npm install @material-ui/core @material-ui/icons
```

you have to create three files in the page directory

- \_app.js
- \_document.js
- theme.js

basic setup in \_app.js

```js
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "next/app";
import Head from "next/head";
import React from "react";
import theme from "./theme";

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
```

basic theming (default settings) in theme.js

```js
import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "red",
    },
  },
});

export default theme;
```

basic setup \_document.js

```js
import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import theme from "./theme";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
```

### 6. Authentication & middleware in next.js

sources:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [bcrypt types](https://www.npmjs.com/package/@types/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [jsonwebtoken types](https://www.npmjs.com/package/@types/jsonwebtoken)

```node
npm install bcrypt jsonwebtoken && install --save-dev @types/bcrypt @types/jsonwebtoken
```

middleware is explicit used by the developer in every route 🥲

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

### 7. Consume protected API Routes

first install the necessary packages

```node
npm install cookie && npm install --save-dev @types/cookie
```

setting secure cookie with JWT as the payload

```ts
response.setHeader(
  "Set-Cookie",
  cookie.serialize("auth", jwt, {
    httpOnly: true,
    // secure: process.env.NODE_ENV !== "production" ? false : true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3600,
    // root of the domain
    path: "/",
  })
);
```

server-side-rendering using the protected api

```ts
import { NextPageContext } from "next";
// instead of Router from "next/router, the documentation demands SingleRouter for server-side
import SingleRouter from "next/router";

const People = ({ people }) => {
  return <div>Hello People! {JSON.stringify(people)}</div>;
};

// a router middleware to reroute if you not logged in
const myFetchHelper = async (url: string, context: NextPageContext) => {
  // getting the cookies send from the client side
  const cookie = context.req.headers?.cookie;
  // forwarding client header to the api-route and fetch the requested data
  const resp = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  });

  // if there is no cookie, you will reroute to the login page (client side)
  if (resp.status === 401 && !context.req) {
    SingleRouter.replace("/login");
    return;
  }

  // if there is not cookie, you will rerouted to the login page (server-side)
  if (resp.status === 401 && context.req) {
    context.res?.writeHead(302, {
      Location: "http://localhost:3000/login",
    });
    context.res.end();
    return;
  }

  const json = await resp.json();
  return json;
};

People.getInitialProps = async (context: NextPageContext) => {
  const json = await myFetchHelper("http://localhost:3000/api/people", context);
  return { people: json };
};

export default People;
```

### 8. getStaticProps and getStaticPath

**Explanation:**

1. on build time, next.js will open the file, f.e. [id].tsx
2. first it will create the available paths, in this case for the id of 6/7/8, nothing else
3. this id's will be passed to getStaticProps and create the properties from the database
4. for each id, props will be created and passed to the jsx function and render the file

- so when someone call the path .../microphone/6 -> there will be a already rendered file
- for any other id, except 6/7/8, there will be no file, and 404 will be displayed

- for a specific amount of files, they can be build ahead, f.e. the 10 most bought items in a shop, this buys time and reduce the server stress

simple way of creating a database based on migration table

```js
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

// instantly invoked function call
(async () => {
  const db = await sqlite.open({
    filename: "./microphone.sqlite",
    driver: sqlite3.Database,
  });

  await db.migrate({ force: true });
  const microphones = await db.all("select * from microphone");
  console.log(JSON.stringify(microphones, null, 4));
})();
```

creating a model for the microphone object

```ts
export interface Microphone {
  id: number;
  brand: string;
  model: string;
  price: number;
  imageUrl: string;
}
```

finally go to getStaticProps: they only run on the server-side on build-time

```ts
export const getStaticProps: GetStaticProps = async (ctx) => {
  const db = await openDB();
  const microphones = await db.all("select * from microphone");

  return { props: { microphones } };
};
```

now there will be creating the getStatic Paths

```ts
export const getStaticPaths: GetStaticPaths<{id: string}> = async () => {

    return {
        fallback: false,
        path: [
            {params: {id: "6"}}
            {params: {id: "7"}}
            {params: {id: "8"}}
        ]
    }
}
```

if the fallback is true, the not specified id`s will be rendered just-in-time

```ts
return {
        fallback: true,
        path: [
            {params: {id: "6"}}
```

this is a way to get the needed id's from a database and create the necessary array

```ts
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const microphones = await db.all("SELECT * FROM microphone");
  const paths = microphones.map((microphone) => {
    return { params: { id: microphone.id.toString() } };
  });

  return {
    fallback: true,
    paths,
  };
};
```

**pagination**

creates only an specific amount (5 in this case) items per page

```ts
export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.currentPage as string;
  const currentPageNumber = (currentPage || 0).toString();

  //
  const min = currentPageNumber * 5; // because there should be 5 items per page
  const max = (currentPageNumber + 1) * 5;

  const db = await openDB();
  const microphones = await db.all(
    "SELECT * FROM microphones WHERE id > ? AND id < ?",
    min,
    max
  );

  return { props: { microphones } };
};
```

creating the paths needed to see all items, f.e. 16 items, you need 4 pages with 5 items each (5,5,5,1)

```tsx
...
export default Index;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {

  const db = await openDB();
  // returns the number of entries in the microphone table
  const { total } = await db.get("SELECT COUNT(*) AS TOTAL FROM microphone");
  // round up, to always get pages, even if there is only one item
  const numberOfPages = Math.ceil(total/5.0);

  // creating an array with the needed Pages to display all items, each entry is an empty string, in the map function the current value is ignored
  const paths = Array(numberOfPages - 1).fill("").map((_, index) => {
    return { params: { currentPage: (index + 1).toString() }}
  })

  return {
    fallback: false,
    paths
  }
}

```

### 9. DataFetching with getServerSideProps

only runs on the server-side, on every client-side call of a page / with getInitialProps it will run on client and on server-side

the difference between them is only in the way the data are passed to the page component. But you can avoid using an api, and call the databases yourself

```js
export const getServerSideProps = async (context) => {
  const db = openDB();
  const people = await db.all("SELECT * FROM people");

  return { props: { people } };
};

export const getInitialProps = async (context) => {
  const response = await fetch("https://app.com/api/people");
  const people = await res.json();

  return { people };
};
```

an example implementation

```tsx
import { GetServerSideProps } from "next";
import { Microphone } from "../model/Microphones";
import { openDB } from "../utils/openDB";

export interface IndexProps {
  microphones: Microphone[];
}

const Index = ({ microphones }: IndexProps) => {
  return <pre>{JSON.stringify(microphones, null, 4)}</pre>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context) => {
  const db = await openDB();
  const microphones = await db.all<Microphone[]>("SELECT * FROM microphone");

  return { props: { microphones } };
};

export default Index;
```

the only problem is, that there will be no navigation before the request is finished. One possible Solution is to show the user that something happens, and when all data is there, creates the new page...

nprogress

```node
npm install nprogress
```

implementation on every page of the application in \_app.js

```js
import "../styles/globals.css";
import { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// shut off a spinner on the right side
NProgress.configure({ showSpinner: false });

// triggers when a link is clicked
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

// triggers when all requests finished and the side is rendered
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

// if something goes wrong
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### 10. env and runtime config

injecting environment variables on build time and make it available to the client-side, you can find the documentation: [here](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration)

next.config.js

```js
module.exports = {
  env: {
    MY_STEP: process.env.MY_STEP,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_ENDPOINT: "/api/helloGuys",
  },
};
```

using it in a page like that

```js
// server-side rendered
// access the configuration and inject the environmental variables
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const MYSECRET = serverRuntimeConfig.MY_SECRET;
const APIENDPOINT = publicRuntimeConfig.API_ENDPOINT;

console.log(MYSECRET); // will not display on the client-side
console.log(APIENDPOINT); // will be visible on the client-side

export default function Gssp(props) {
  return (
    <>
      {/* will not display on the client-side  */}
      <div>MY_SECRET: {MYSECRET}</div>
      {/* will be visible on the client-side   */}
      <div>API_ENDPOINT: {APIENDPOINT}</div>
      {/* MY_SECRET will be displayed because it was injected in the component props  */}
      <div>{JSON.stringify(props, null, 4)}</div>
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      // injecting server-variable in the client-component and expose it the user
      MY_SECRET: MYSECRET,
      API_ENDPOINT: APIENDPOINT,
    },
  };
};
```

to use your own environmental variables on your local machine you have to use [packages like dotenv](https://www.npmjs.com/package/dotenv)

```node
npm install dotenv
```

putting it into the next.config.js file

```js
require("dotenv").config();

module.exports = {
  env: {
    MY_STEP: process.env.MY_STEP,
  },
...
```

### image optimization

you can find source code: [here](https://github.com/bmvantunes/youtube-2020-dec-nextjs-image-component)<br />
you can find the video file: [here](https://www.youtube.com/watch?v=R4sdWUI3-mY&list=PLYSZyzpwBEWSQsrukurP09ksi49H9Yj40&index=12)

the tool uses imageSets

```tsx
export default function SrcSet () {
  return (
    <div>
      <h2>My Image</h2>
      <img
        {/* the src specifies the default */}
        src="/example-red/small-800px.png"
        {/* the srcSet will be used by the browser to decide which one to load, depending on the screen total viewport width */}
        srcSet="
          /example-red/small-800px.png 800w
          /example-red/medium-1200px.png 1200w
          /example-red/large-1600px.png 1600w
        "
        {/* to use it probably with libraries like Bootstrap, you have to define the view width depending on the img size (breakpoints) */}
        sizes="(min-width: 767px) 33vw, (min-width: 568px) 50vw, 100vw"
      />
    </div>
  )
}
```

[Image component](https://nextjs.org/docs/api-reference/next/image) from next.js (responsive and visible in viewport including a placeholder)

```tsx
import Image from "next/image";

interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
}

// just for following the tutorial
const photos: Photo[] = [{ src: "test", width: 200, height: 200, alt: "test" }];

export default function Image() {
  return (
    <div>
      <h2>Image Component</h2>
      {photos.map((photo) => {
        <Image
          alt={photo.alt}
          src={photo.src}
          key={photo.src}
          width={photo.width}
          height={photo.height}
          layout="fixed"
        />;
      })}
    </div>
  );
}
```

using it as background-image

```js
...
<Image
  src="..."
  alt="..."
  layout="fill"
  objectFit="cover"
  objectPosition="bottom center"
/>
...
```

trick to load the last image on a page instantly (f.e. a logo or company slogan)

```js
photos.map((photo, index) => {
  ...
  loading={(photos.length === index + 1) ? "eager" : "lazy"}
  ...
})
```

you can override the default image transformation settings in next.config.js file

```js
...
images: {
    deviceSizes: [640, 750, 1080, 1920, 2048, 2840],
  },
...
```

### api routes using next-connect

you can find the next-connect: [here](https://github.com/hoangvvo/next-connect)

example api call for a GET-method

```ts
import nextConnect from "next-connect";
import { openDB } from "../../openDB";

export default nextConnect<NextApiRequest, NextApiResponse>({
  // option object property, if nothing is found, custom response
  onNoMatch(req, res, next) {
    res
      .status(405)
      .json({ code: 405, message: `Method ${req.method}not supported` });
  },
  // option object property, if something goes wrong, custom response
  onError(error, req, res) {
    res.status(500).json({ code: 500, message: `${error.message}` });
  },
}).get(async (request, response) => {
  const db = await openDB();
  const champions = await db.all(
    "SELECT * FROM driver WHERE titles > 0 ORDER BY titles DESC, name ASC"
  );
  res.status(200).json(champions);
});
```

the first part could put outside (file handler.js)

```ts
export default nextConnect<NextApiRequest, NextApiResponse>({
  // option object property, if nothing is found, custom response
  onNoMatch(req, res, next) {
    res
      .status(405)
      .json({ code: 405, message: `Method ${req.method}not supported` });
  },
  // option object property, if something goes wrong, custom response
  onError(error, req, res) {
    res.status(500).json({ code: 500, message: `${error.message}` });
  },
});
```

importing into another file

```js
import handler from "../handler"
...
export default handler.get(
  async (request, response) => {
    const db = await openDB();
    const champions = await db.all(
      "SELECT * FROM driver WHERE titles > 0 ORDER BY titles DESC, name ASC"
    );
    res.status(200).json(champions);
  }
);
```

using a middleware, to verify a JWT Token and authorize the route

```ts
export interface NextApiRequestExtended extends NextApiRequest {
  userID: number | null;
  userName: string | null;
}

export default nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ code: 405, message: `Method ${req.method}not supported` });
  },
  onError(error, res) {
    res.status(500).json({ code: 500, message: `${error.message}` });
  },
}).use((req, res, next) => {
  req.userID = null;
  req.userName = null;

  const { authorization } = req.headers;

  if (!authorization) {
    next();
  } else {
    verify(
      authorization,
      process.env.JWT_SECRET,
      (error: any, decoded: any) => {
        if (!error && decoded) {
          req.userId = decoded.userID;
          req.userName = decoded.userName;
        }
        next();
      }
    );
  }
});
```
