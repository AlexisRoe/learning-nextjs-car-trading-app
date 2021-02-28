import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import sqlite3 from "sqlite3";

// default is needed ti work correct
export default async function getAllVehicles(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response
      .status(500)
      .json({ code: 500, message: "wrong http request method" });
  }

  const db = await sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
  const people = await db.all("select * from person");

  response.json(people);
}
