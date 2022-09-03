import * as prismaFunctions from "./prisma";
import express from "express";
const router = new express.Router();

import { expressjwt as jwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
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

router.patch("/update/user/:id", checkJwt, async (req, res) => {
  try {
    await prismaFunctions.updateUser(req.params.id, req.body);
    res.sendStatus(201);
  } catch (e) {}
});

router.patch("/create/score/:id", checkJwt, async (req, res) => {
  console.log(req.params.id);
});

module.exports = router;
