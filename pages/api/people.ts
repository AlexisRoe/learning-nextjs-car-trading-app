import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { verify } from "jsonwebtoken";

// authentication middleware
export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // if the JWT is offered and correct, the next function will be called = next in express.js
  verify(
    req.headers.authorization,
    "JWT_SECRET",
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ code: 500, message: "Authentication failed" });
    }
  );
};

export default authenticated(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });

  const people = await db.all("SELECT id, email, name FROM person");
  res.json(people);
});
