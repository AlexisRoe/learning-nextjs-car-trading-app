/* eslint-disable @typescript-eslint/no-var-requires */
// const sqlite = require('sqlite');
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
