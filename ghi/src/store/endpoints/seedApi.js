import { apiSlice } from "../apiSlice";

export const seedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSeed: builder.mutation({
      query: ({ info, token }) => ({
        url: "/api/seeds",
        method: "post",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Seeds", id: arg.id }],
    }),
    seedsByUser: builder.query({
      query: (token) => ({
        url: `/api/seeds`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "Seeds",
        ...result.map(({ id }) => ({ type: "Seeds", id })),
      ],
    }),
    updateSeed: builder.mutation({
      query: ({ info, id, token }) => ({
        url: `/api/seeds/${id}`,
        method: "put",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Seeds", id: arg.id }],
    }),
    deleteSeed: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/seeds/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Seeds", id: arg.id }],
    }),
    addToList: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/seeds/${id}/list/add`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Seeds", id: arg.id }],
    }),
    removeFromList: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/seeds/${id}/list/remove`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Seeds", id: arg.id }],
    }),
    shoppingList: builder.query({
      query: ({ token }) => ({
        url: `/api/seeds/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "Seeds",
        ...result.map(({ id }) => ({ type: "Seeds", id })),
      ],
    }),
  }),
});

export const {
  useAddSeedMutation,
  useSeedsByUserQuery,
  useUpdateSeedMutation,
  useDeleteSeedMutation,
  useAddToListMutation,
  useRemoveFromListMutation,
  useShoppingListQuery,
} = seedApiSlice;
