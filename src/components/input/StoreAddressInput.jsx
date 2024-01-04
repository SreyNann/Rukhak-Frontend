import TextField from "@mui/material/TextField";
import useAuth from "@/hooks/auth/useAuth";
import authValidators from "@/validators/authValidators";
import { useEffect } from "react";

function StoreAddressInput() {
  const {
    storeAddress,
    setStoreAddress,
    isStoreAddress,
    setIsStoreAddress,
    storeAddressFocus,
    setStoreAddressFocus,
  } = useAuth();

  useEffect(() => {
    const result =
      storeAddress.length >= 8 &&
      authValidators.ADDRESS_REGEX.test(storeAddress) &&
      true;
    setIsStoreAddress(result);
  }, [storeAddress]);

  return (
    <TextField
      fullWidth
      name="store-address"
      label="Store Address #"
      required
      value={storeAddress}
      onBlur={() => setStoreAddressFocus(false)}
      onChange={(e) => setStoreAddress(e.target.value)}
      error={
        !storeAddress && !storeAddressFocus
          ? true
          : storeAddress && !isStoreAddress && !storeAddressFocus
          ? true
          : false
      }
      helperText={
        (!storeAddress && !storeAddressFocus && "Enter store address") ||
        (storeAddress &&
          !isStoreAddress &&
          !storeAddressFocus &&
          "Store address is incorrect.")
      }
    />
  );
}

export default StoreAddressInput;
