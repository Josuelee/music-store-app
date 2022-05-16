import "./CheckOut.css";
import { useState, useEffect } from "react";
import { Step, Stepper, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { commerce } from "../../lib/commerce";
import {
  generateCheckoutToken,
  initalStep,
} from "../../actions/checkoutActions";

import Address from "./Address/Address";
import Payment from "./Payment/Payment";

import { CAPTURE_CHECKOUT, REFRESH_CART } from "../../types";
import Confirmation from "./Confirmation/Confirmation";

const stepsText = ["Shipping Address", "Payment Details"];

const Checkout = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { steps } = state.checkout;
  const [errorMessage, setErrorMessage] = useState("");

  const generateToken = async () => {
    try {
      const { id } = state.cart;
      const token = await commerce.checkout.generateToken(id, { type: "cart" });
      dispatch(generateCheckoutToken(token));
      dispatch(initalStep(0));
    } catch (err) {
      navigate("/products");
    }
  };

  useEffect(() => {
    generateToken();
  }, [state.cart]);

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    dispatch({ type: REFRESH_CART, payload: newCart });
  };

  const handleCaptureCheckout = async (tokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
      dispatch({ type: CAPTURE_CHECKOUT, payload: incomingOrder });
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const ShowStep = () =>
    steps === 0 ? (
      <Address />
    ) : (
      <Payment handleCaptureCheckout={handleCaptureCheckout} />
    );

  if (errorMessage) {
    <>
      <h2>{errorMessage}</h2>
      <br />
      <button className="btn-style" onClick={() => navigate("/")}>
        Back To Home
      </button>
    </>;
  }

  return (
    <div className="music__checkout section__container section__margin">
      <h2 className="title-style title__margin music__checkout-title">
        Checkout
      </h2>
      <Stepper activeStep={steps} className="music__checkout-stepper">
        {stepsText.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {steps >= 2 ? <Confirmation /> : <ShowStep />}
    </div>
  );
};
export default Checkout;
