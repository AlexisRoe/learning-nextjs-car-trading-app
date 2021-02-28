import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { authenticated } from "./authenticated_middleware";

// default is needed to work correct
export default authenticated(async function getAllVehicles(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response
      .status(401)
      .json({ code: 401, message: "wrong http request method" });
  }

  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  const people = await db.all("select id, email, name from person");

  response.json(people);
});
