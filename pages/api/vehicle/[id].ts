import { NextApiRequest, NextApiResponse } from "next";

export default function getVehicleByID(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response
      .status(500)
      .json({ code: 500, message: "wrong http request method" });
  }

  response.json({ byID: request.query.id, method: request.method });
}
