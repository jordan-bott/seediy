import { apiSlice } from "../apiSlice";

export const waterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWaterLog: builder.mutation({
      query: ({ info, token }) => ({
        url: "/api/water",
        method: "post",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Water", id: arg.id }],
    }),
    deleteWaterLog: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/water/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Water", id: arg.id }],
    }),
    waterLogsByUser: builder.query({
      query: ({ id, token }) => ({
        url: `/api/users/${id}/water`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "Water",
        ...result.map(({ id }) => ({ type: "Water", id })),
      ],
    }),
  }),
});

export const {
  useAddWaterLogMutation,
  useDeleteWaterLogMutation,
  useWaterLogsByUserQuery,
} = waterApiSlice;
