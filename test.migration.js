/* eslint-disable @typescript-eslint/no-var-requires */
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

(async () => {
  const db = await sqlite.open({
    filename: "./microphone.sqlite",
    driver: sqlite3.Database,
  });

  await db.migrate({ force: true });
  const microphones = await db.all("select * from microphone");
  console.log(JSON.stringify(microphones, null, 4));
})();
