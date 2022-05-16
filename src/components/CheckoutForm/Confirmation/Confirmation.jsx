import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loader from "../../Loader/Loader";
import { backStep } from "../../../actions/checkoutActions";
import "./Confirmation.css";

const Confirmation = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { order } = state.checkout;

  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(backStep(2));
    navigate("/");
  };

  return (
    <>
      {order.customer ? (
        <>
          <div>
            <h2 className="music__confirmation_title">
              Thank you for your purchase! {order.customer.firstname}{" "}
              {order.customer.lastname}
              <hr />
            </h2>
            <p className="music__confirmation_ref">
              Order ref: {order.customer_reference}
            </p>
          </div>
          <br />
          <button className="btn-style" onClick={handleClick}>
            Back To Home
          </button>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Confirmation;
