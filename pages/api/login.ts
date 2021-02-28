// import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function login(request, response) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  if (request.method === "POST") {
    // first get the requested user from the database
    const person = await db.get("select * from person where email = ?", [
      request.body.email,
    ]);

    // TODO: response if the user doesnt exists or cant be found
    // ...

    // compare the stored password with the offered once
    compare(request.body.password, person.password, function (err, result) {
      if (!err && result) {
        // if the password is correct, send a JWT_TOKEN to the frontend
        const claims = {
          sub: person.id,
          myPersonName: person.name,
          myPersonMail: person.email,
        };
        // of course the JWT_SECRET should be stored in enviremental variable
        const jwt = sign(claims, "JWT_SECRET", { expiresIn: "1h" });

        response.json({ code: 200, authToken: jwt });
      } else {
        response.json({ code: 400, message: "not ok" });
      }
    });
  } else {
    response.status(405).json({ message: "http method not supported" });
  }
}
