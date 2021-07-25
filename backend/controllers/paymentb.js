var braintree = require("braintree");

//doc
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "5pkrv32mbvpkf8vm",
  publicKey: "8nnz4jq5z2rjmjmp",
  privateKey: "b7516e4d08671dec41ec83ffd646b092"
}); 

exports.getToken = (req, res) => {
  //generating client token--DOCS
  gateway.clientToken.generate({}, function(err, response) {
    //response object has the token
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

//processing payment --> using amount & nonce from client(given by braintree)
exports.processPayment = (req, res) => {
  //docs--takes nonce from client
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
