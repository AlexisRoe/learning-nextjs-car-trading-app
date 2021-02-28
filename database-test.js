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
  try {
    const db = await openDB();
    await db.migrate({ force: "last" });
  } catch (error) {
    console.error(error.message);
  }
}

setup();
