import { createContext, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import {
  useRefreshMutation,
  useLogoutMutation,
} from "@/features/auth/authApiSlice";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const accessToken = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const persist = localStorage.getItem("persist") === "true" ? true : false;
  const [errorRefresh, setErrorRefresh] = useState(false);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const firstInputRef = useRef(null);

  const [canSignUp, setCanSignUp] = useState(false);
  const [errGoogle, setErrGoogle] = useState("");

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [isFirstName, setIsFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(true);

  const [lastName, setLastName] = useState("");
  const [isLastName, setIsLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(true);

  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState();
  const [passwordFocusStart, setPasswordFocusStart] = useState(false);
  const [passwordFocusAfter, setPasswordForcusAfter] = useState(true);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(true);

  const [dateValue, setDateValue] = useState("");
  const [isDateValue, setIsDateValue] = useState(false);
  const [dateValueFocus, setDateValueFocus] = useState(true);

  const [gender, setGender] = useState("");
  const [genderFocus, setGenderFocus] = useState(true);

  const [storeName, setStoreName] = useState("");
  const [storeNameFocus, setStoreNameFocus] = useState(true);

  const [storeAddress, setStoreAddress] = useState("");
  const [isStoreAddress, setIsStoreAddress] = useState(false);
  const [storeAddressFocus, setStoreAddressFocus] = useState(true);

  const [LonLat, setLonLat] = useState([104.92, 11.56]);

  const [refreshToken, { isLoading: isRefreshLoading }] = useRefreshMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  useEffect(() => {
    // Because React 18 useEffect is run twice in development.
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refreshToken().unwrap();
        } catch (err) {
          // No refresh token in cookie (expire)
          setErrorRefresh(true);
        }
      };

      const startLogout = async () => {
        // Try catch already handle in authAPIslice
        await logout().unwrap();
      };
      if (!accessToken && persist) {
        verifyRefreshToken();
      } else if (errorRefresh) {
        startLogout();
      }
    }
    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleRemoreStoreLonLat = (latitude, longitude) => {
    if (latitude && longitude) {
      localStorage.removeItem("storeLatitude");
      localStorage.removeItem("storeLongitude");
    }
    return;
  };

  return (
    <AuthContext.Provider
      value={{
        isRefreshLoading,
        isLogoutLoading,
        isPassword,
        setIsPassword,
        canSignUp,
        setCanSignUp,
        errGoogle,
        setErrGoogle,
        email,
        setEmail,
        isEmail,
        setIsEmail,
        emailFocus,
        setEmailFocus,
        firstName,
        setFirstName,
        isFirstName,
        setIsFirstName,
        firstNameFocus,
        setFirstNameFocus,
        lastName,
        setLastName,
        isLastName,
        setIsLastName,
        lastNameFocus,
        setLastNameFocus,
        password,
        setPassword,
        passwordFocusAfter,
        setPasswordForcusAfter,
        passwordFocusStart,
        setPasswordFocusStart,
        passwordConfirm,
        setPasswordConfirm,
        passwordConfirmFocus,
        setPasswordConfirmFocus,
        isMatch,
        setIsMatch,
        errorRefresh,
        setErrorRefresh,
        phoneNumber,
        setPhoneNumber,
        isPhoneNumber,
        setIsPhoneNumber,
        phoneNumberFocus,
        setPhoneNumberFocus,
        dateValue,
        setDateValue,
        dateValueFocus,
        setDateValueFocus,
        isDateValue,
        setIsDateValue,
        gender,
        setGender,
        genderFocus,
        setGenderFocus,
        storeName,
        setStoreName,
        storeNameFocus,
        setStoreNameFocus,
        storeAddress,
        setStoreAddress,
        isStoreAddress,
        setIsStoreAddress,
        storeAddressFocus,
        setStoreAddressFocus,
        LonLat,
        setLonLat,
        handleRemoreStoreLonLat,
        otp,
        setOtp,
        firstInputRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
