import { apiSlice } from "@/utils/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/me/${userId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        if (responseData?.data?.user?._doc) {
          const user = {
            ...responseData?.data.user._doc,
            sessions: responseData?.data.user.$$populatedVirtuals.sessions,
            addresses: responseData?.data.user.$$populatedVirtuals.addresses,
            imageURL: responseData?.data.user.imageURL || undefined,
          };
          return user;
        }
        return responseData?.data.user;
      },
      providesTags: () => ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/me/${data?.userId}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: () => ["User"],
    }),
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/users/upload/image",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: () => ["User"],
    }),
    confirmUpdateEmail: builder.mutation({
      query: (email) => ({
        url: "/users/confirm/email",
        method: "POST",
        body: email,
      }),
      invalidatesTags: () => ["User"],
    }),
    updateEmail: builder.mutation({
      query: (OTP) => ({
        url: "/users/update/email",
        method: "PATCH",
        body: OTP,
      }),
      invalidatesTags: () => ["User"],
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUploadProfileImageMutation,
  useGetUserQuery,
  useConfirmUpdateEmailMutation,
  useUpdateEmailMutation,
} = userApiSlice;
