import { NextPageContext } from "next";
import SingleRouter from "next/router";

interface People {
  people: string[];
}

const People = ({ people }: People) => {
  return <div>Hello People! {JSON.stringify(people)}</div>;
};

const myFetchHelper = async (url: string, context: NextPageContext) => {
  const cookie = context.req.headers?.cookie;
  const resp = await fetch(url, {
    headers: {
      cookie: cookie,
    },
  });

  if (resp.status === 401 && !context.req) {
    SingleRouter.replace("/login");
    return;
  }

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
