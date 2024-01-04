import createTheme from "@mui/material/styles/createTheme";

const settingTheme = createTheme({
  boxContainer: {
    display: "flex",
    padding: "16px",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowBack: {
    cursor: "pointer",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "44%",
    right: "50%",
    transform: "translateX(-50%)",
  },
  settingContainer: {
    maxWidth: "500px",
    margin: "0 auto",
    height: "100vh",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    alignItems: "center",
  },
  imageContainer: {
    minWidth: "70px",
    width: "70px",
    height: "70px",
    overflow: "hidden",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "2px solid whitesmoke",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  imageProfile: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  updateNameContainer: {
    display: "flex",
    flexDirection: "column",
  },
  updateNameInputContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
  },
  newEmailContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  OTPPageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    margin: "50px auto",
    padding: "16px",
  },
  boxOTPContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  OTPInputContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  OTPInputs: {
    height: "50px",
    width: "50px",
    border: "1px solid #256c2c",
    fontSize: "30px",
    textAlign: "center",
    borderRadius: "20px",
    backgroundColor: "#fcfdf6",
    color: "#256c2c",
    caretColor: "transparent",
    "&:focus": {
      color: "1px solid black",
      outline: "2px solid #256c2c",
      border: "none",
      fonstSize: "1px",
    },
  },
  OTPButtonContainer: {
    display: "flex",
    width: "100%",
    gap: "10px",
    alignItems: "center",
  },
});

export default settingTheme;
