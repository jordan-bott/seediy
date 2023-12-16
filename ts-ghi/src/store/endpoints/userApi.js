import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => ({
        url: "/api/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    editUser: builder.mutation({
      query: ({ info, id, token }) => ({
        url: `/api/users/${id}`,
        method: "put",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/api/users/all",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "User",
        ...result.map(({ id }) => ({ type: "User", id })),
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/users/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    updatePassword: builder.mutation({
      query: ({ info, id, token }) => ({
        url: `/api/users/${id}/password`,
        method: "put",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    updateToAdmin: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/users/${id}/admin`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
  }),
});

export const {
  useGetUserQuery,
  useEditUserMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useUpdateToAdminMutation,
} = userApiSlice;
