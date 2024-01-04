import Box from "@mui/material/Box";
import OTPContent from "@/components/auth/OTPContent";
import OTPInput from "@/components/auth/OTPInput";
import useUser from "@/hooks/user/useUser";
import ButtonGeneral from "@/components/user/ButtonGeneral";
import useAuth from "@/hooks/auth/useAuth";
import { useUpdateEmailMutation } from "@/features/user/userApiSlice";
import settingTheme from "@/theme/settingTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthError from "@/components/auth/AuthError";

function ConfirmOTP({ isUpdateEmail }) {
  const { otp, setOtp, firstInputRef } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [updateEmail, { isLoading }] = useUpdateEmailMutation();
  const { user, handleUpdateStatus } = useUser();
  const newEmail = user?.tempEmail;
  const navigate = useNavigate();
  const canVerify = otp.length === 6 && otp.every((el) => el !== "");

  const handleClearValue = () => {
    setOtp([...otp.map(() => "")]);
    firstInputRef.current.focus();
  };

  const handleVerifyUpdateEmail = async () => {
    if (canVerify) {
      try {
        const response = await updateEmail({ OTP: otp.join("") }).unwrap();
        if (response?.status === "success") {
          handleUpdateStatus();
          navigate("/setting");
        }
      } catch (err) {
        if (err?.status === 500) {
          setErrorMessage("OTP is incorrect! Please try again.");
          handleClearValue();
        } else if (err?.status === 400) {
          setErrorMessage("OTP is expired! Please try resend the OTP.");
        } else {
          setErrorMessage("Something went wrong! Please try again later.");
        }
      }
    }
  };
  return (
    <>
      <Box sx={settingTheme.OTPPageContainer}>
        {errorMessage && <AuthError errorMessage={errorMessage} />}
        {isUpdateEmail && (
          <OTPContent
            title="Verify Email Address"
            description={`Please enter 6 digits code that we have sent to ${
              newEmail || "loading..."
            }`}
          />
        )}
        <OTPInput />
        <Box sx={settingTheme.OTPButtonContainer}>
          <ButtonGeneral
            text="clear"
            buttonBGColor="gray"
            buttonHover="#666666"
            fullWidth="100%"
            onClick={handleClearValue}
          />
          <ButtonGeneral
            text="verify"
            fullWidth="100%"
            onClick={isUpdateEmail ? handleVerifyUpdateEmail : null}
            canClick={canVerify}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </>
  );
}

export default ConfirmOTP;
