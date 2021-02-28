import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { hash } from "bcrypt";

export default async function signUp(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (request.method === "POST") {
    // get the password form a signUp form and store it in a database securily

    hash(
      request.body.password,
      10,
      async function (err: boolean, hash: string) {
        // store password in the database
        // ...

        if (err) {
          response.json({ code: 500, message: "something goes wrong" });
        }

        const statement = await db.prepare(
          "INSERT INTO person (name, email, password) VALUES (?,?,?)"
        );
        await statement.run(request.body.name, request.body.email, hash);
        statement.finalize();

        const person = await db.get("select * from person");
        response.json(person);
      }
    );
  } else {
    response.status(405).json({ message: "http method not supported" });
  }
}
