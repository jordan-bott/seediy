import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Token"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().token;

    console.log("token", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (info) => {
        return {
          url: "/api/users",
          method: "post",
          body: info,
        };
      },
      invalidatesTags: ["Token"],
    }),
    adminSignup: builder.mutation({
      query: (info) => {
        return {
          url: "/api/users/admin",
          method: "post",
          body: info,
        };
      },
      invalidatesTags: ["Token"],
    }),
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.username);
          formData.append("password", info.password);
        }
        return {
          url: "/token",

          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Token"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Token"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
} = apiSlice;
