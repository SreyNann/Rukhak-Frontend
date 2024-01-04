import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import useAuth from "@/hooks/auth/useAuth";
import { useEffect } from "react";
import authValidators from "@/validators/authValidators";

function PhoneNumberInput({ errApi }) {
  const headNumberKH = "+855";
  const {
    phoneNumber,
    phoneNumberFocus,
    setPhoneNumberFocus,
    isPhoneNumber,
    setIsPhoneNumber,
    setPhoneNumber,
  } = useAuth();

  useEffect(() => {
    const result =
      phoneNumber.length >= 8 &&
      authValidators.PHONE_NUMBER_REGEX.test(phoneNumber) &&
      true;
    setIsPhoneNumber(result);
  }, [phoneNumber]);

  return (
    <TextField
      label="Phone Number"
      id="phone-number"
      name="phone-number"
      fullWidth
      required
      onChange={(e) => setPhoneNumber(e.target.value)}
      value={phoneNumber}
      onBlur={() => setPhoneNumberFocus(false)}
      error={
        !phoneNumber && !phoneNumberFocus
          ? true
          : phoneNumber && !isPhoneNumber && !phoneNumberFocus
          ? true
          : errApi?.path === "phoneNumber"
          ? true
          : false
      }
      helperText={
        (!phoneNumber && !phoneNumberFocus && "Enter a phone number.") ||
        (phoneNumber &&
          !isPhoneNumber &&
          !phoneNumberFocus &&
          "Enter a valid phone number.") ||
        (errApi?.path === "phoneNumber" && errApi?.msg)
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{headNumberKH}</InputAdornment>
        ),
      }}
    />
  );
}

export default PhoneNumberInput;
