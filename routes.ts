// import { * } from "./prisma"
import { Request, Response } from "express";
const express = require("express");
const router = new express.Router();

const prismaF = require("./prisma.ts");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    issuerBaseURL: `https://dev-2szf794g.us.auth0.com/`,
    cache: true,
    rateLimit: true,

    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-2szf794g.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer

  audience: "http://localhost:6000", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://dev-2szf794g.us.auth0.com/",
  algorithms: ["RS256"],
});

router.patch(
  "/update/user/:id",
  checkJwt,
  async (req: Request, res: Response) => {
    prismaF.updateUser();
  }
);

module.exports = router;
