const ErrorForm = ({ message, color }) => {
  const styles = {
    fontSize: "20px",
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    backgroundColor: color,
    marginTop: ".3rem",
  };
  return <div style={styles}>{message}</div>;
};
export default ErrorForm;
