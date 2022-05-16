import "./SelectsForm.css";

const SelectsForm = ({ name, data, setShipping }) => {
  const handleChange = (e) => {
    setShipping(e.target.value);
  };

  return (
    <div className="music__address_select">
      <label className="music__address_select_label" htmlFor={name}>
        Shipping {name}
      </label>
      <select name={name} id={name} onChange={handleChange} required>
        {data?.map((el) => (
          <option value={el?.id} key={el?.id}>
            {el?.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectsForm;
