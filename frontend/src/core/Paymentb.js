import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  //STEP 1&2 invoked here
  //info --> response
  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  //dropin is from brain-tree-wen-drop-in-react docx
  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 && isAuthenticated() ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            /> 
            <button className="btn btn-block btn-success"  style={{width:"100%"}} onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login/Add to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {

    setInfo({ loading: true });
    let nonce;
    //console.log(info.instance);
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          //TODO: empty the cart
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };
          console.log(orderData);
         
          //create order before emptying out
          createOrder(userId, token, orderData);

          cartEmpty(() => {
            console.log("We didn't crash--TESTING");
          });
          
          
          //TODO: force reload
          setReload(!reload);
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is ₹ {getAmount()}</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
