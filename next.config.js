// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

module.exports = {
  env: {
    MY_STEP: process.env.MY_STEP,
  },
  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET,
  },
  publicRuntimeConfig: {
    API_ENDPOINT: "/api/helloGuys",
  },
};
