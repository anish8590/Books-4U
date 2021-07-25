const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/authentication");

const { getToken, processPayment } = require("../controllers/paymentb");

const {getUserById} = require("../controllers/user")
router.param("userId", getUserById);

//step 1&2 : gives token for request
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

//submit info--to have transaction
//Step 4&5
router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
