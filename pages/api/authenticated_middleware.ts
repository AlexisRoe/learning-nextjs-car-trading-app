import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// authentication middleware
export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // if the JWT is offered and correct, the next function will be called = next in express.js
  verify(req.cookies.auth, "JWT_SECRET", async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(500).json({ code: 500, message: "Authentication failed" });
  });
};
