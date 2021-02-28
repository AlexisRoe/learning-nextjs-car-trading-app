import { NextApiRequest, NextApiResponse } from "next";

// default is needed ti work correct
export default function getAllVehicles(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response
      .status(500)
      .json({ code: 500, message: "wrong http request method" });
  }

  response.json({ hello: "world", method: request.method });
}
