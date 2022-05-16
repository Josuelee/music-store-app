import "./Address.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ErrorForm from "./ErrorForm";
import SelectsForm from "../SelectsForm/SelectsForm";

import { commerce } from "../../../lib/commerce";
import { nextStep, updateShippingData } from "../../../actions/checkoutActions";
import { validateForm } from "../../../helpers/validateForm";

const initialForm = {
  firstname: "",
  lastname: "",
  address1: "",
  email: "",
  city: "",
  zip: "",
};

const Address = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const countries = Object.entries(shippingCountries).map((el) => ({
    id: el[0],
    name: el[1],
  }));

  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([key, value]) => ({
      id: key,
      name: value,
    })
  );

  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const options = Object.entries(shippingOptions).map((el) => ({
    id: el[1].id,
    name: `${el[1].description} - (${el[1].price.formatted_with_symbol})`,
  }));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const fetchCountries = async () => {
    const { token } = state.checkout;
    if (!token) return;

    const { countries } = await commerce.services.localeListShippingCountries(
      token?.id
    );

    setShippingCountries(countries);

    //this means when it renders for the first time, it will take the country of 0 row
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async () => {
    const { token } = state.checkout;

    if (!token || !shippingCountry) return;

    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        token?.id,
        shippingCountry
      );

    setShippingSubdivisions(subdivisions);

    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchOptions = async () => {
    const { token } = state.checkout;

    if (!token || !shippingSubdivision) return;

    const options = await commerce.checkout.getShippingOptions(token.id, {
      country: shippingCountry,
      region: shippingSubdivision,
    });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions();
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchOptions();
  }, [shippingSubdivision]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    };

    setFormErrors(validateForm(data));

    if (Object.keys(validateForm(data)).length > 0) return;

    dispatch(nextStep(1));
    dispatch(updateShippingData(data));
  };

  return (
    <>
      <h3 className="music__address-title">Shipping Address</h3>
      <form className="music__address-form" onSubmit={handleSubmit}>
        <div className="music__address-container">
          <div className="music__address-section">
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              onChange={handleFormChange}
              value={form.firstname}
              required
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              onChange={handleFormChange}
              value={form.lastname}
              required
            />
          </div>
          {formErrors.firstname && (
            <ErrorForm message={formErrors.firstname} color="#FF3333" />
          )}
          {formErrors.lastname && (
            <ErrorForm message={formErrors.lastname} color="#FF3333" />
          )}
        </div>
        <div className="music__address-container">
          <div className="music__address-section">
            <input
              type="text"
              name="address1"
              placeholder="Address"
              id="address1"
              onChange={handleFormChange}
              value={form.address1}
              required
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleFormChange}
              value={form.email}
              required
            />
          </div>
          {formErrors.email && (
            <ErrorForm message={formErrors.email} color="#FF3333" />
          )}
        </div>
        <div className="music__address-container">
          <div className="music__address-section">
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={handleFormChange}
              value={form.city}
              required
            />
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="Zip"
              onChange={handleFormChange}
              value={form.zip}
              required
            />
          </div>
          {formErrors.city && (
            <ErrorForm message={formErrors.city} color="#FF3333" />
          )}
          {formErrors.zip && (
            <ErrorForm message={formErrors.zip} color="#FF3333" />
          )}
        </div>

        <div className="music__address-section">
          <SelectsForm
            name="countries"
            data={countries}
            setShipping={setShippingCountry}
          />

          <SelectsForm
            name="options"
            data={options}
            setShipping={shippingOption}
          />
        </div>
        <div className="music__address-section">
          <SelectsForm
            name="subdivisions"
            data={subdivisions}
            setShipping={setShippingSubdivision}
          />
        </div>

        <div className="music__address-buttons">
          <input
            type="submit"
            className="btn-style"
            value="Back to products"
            onClick={() => navigate("/products")}
          />
          <input type="submit" className="btn-style" value="Next" />
        </div>
      </form>
    </>
  );
};
export default Address;
