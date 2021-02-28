import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import sqlite3 from "sqlite3";

export default async function getVehicleByID(
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
  const vehicle = await db.get(`select * from vehicle where id=?`, [
    request.query.id,
  ]);
  response.json(vehicle);
}
