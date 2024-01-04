import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/auth/AuthContext";
import AuthSignupMethod from "./AuthSignupMethods";
import { useGoogleLoginMutation } from "@/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import useAuth from "@/hooks/auth/useAuth";

function GoogleButton() {
  const { setErrGoogle } = useContext(AuthContext);
  const { setErrorRefresh } = useAuth();
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();

  let googleButtonWrapper;
  const handleGoogleCallback = async (response) => {
    const credential = response?.credential;
    if (!credential) {
      setErrGoogle(
        "Google sign in error. Please try again later or use a different method to sign in."
      );
    }
    try {
      const response = await googleLogin({ credential }).unwrap();
      if (response?.status === "success") {
        const user = response?.data.user;
        setErrorRefresh(false);
        localStorage.setItem("persist", true);
        dispatch(setCredentials({ user }));
      }
    } catch (err) {
      setErrGoogle(err?.data.message);
    }
  };

  const handleGoogleLogin = () => {
    if (googleButtonWrapper) {
      googleButtonWrapper.click();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
        // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          ux_mode: "popup",
        });
        const createFakeGoogleWrapper = () => {
          const googleLoginWrapper = document.createElement("div");
          googleLoginWrapper.style.display = "none";
          googleLoginWrapper.classList.add("custom-google-button");

          document.body.appendChild(googleLoginWrapper);

          window.google.accounts.id.renderButton(googleLoginWrapper, {
            type: "icon",
            width: "200",
          });

          const googleLoginWrapperButton =
            googleLoginWrapper.querySelector("div[role=button]");

          return {
            click: () => {
              googleLoginWrapperButton.click();
            },
          };
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        googleButtonWrapper = createFakeGoogleWrapper();
      }
    }, 300);
  }, [handleGoogleLogin]);

  return (
    <AuthSignupMethod
      onClick={handleGoogleLogin}
      type="Google"
      process="Login"
    />
  );
}

export default GoogleButton;
