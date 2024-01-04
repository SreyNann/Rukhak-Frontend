import { createContext, useState } from "react";
import { useGetUserQuery } from "@/features/user/userApiSlice";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [openPreviewImage, setOpenPreviewImage] = useState(false);
  const [isUpdateInfoSuccess, setIsUpdateInfoSuccess] = useState(false);
  const userId = useSelector(selectCurrentUserId);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserQuery(userId, {
    skip: userId ? false : true, // true means don't fetch user
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(user);
  const handleUpdateStatus = () => {
    setIsUpdateInfoSuccess(true);
    setTimeout(() => {
      setIsUpdateInfoSuccess(false);
    }, 10000);
  };

  return (
    <UserContext.Provider
      value={{
        openPreviewImage,
        setOpenPreviewImage,
        isUpdateInfoSuccess,
        handleUpdateStatus,
        user,
        isLoading,
        isError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
