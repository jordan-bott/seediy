import { apiSlice } from "../apiSlice";

export const seedStorageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSeedStorage: builder.mutation({
      query: ({ info, token }) => ({
        url: "/api/seedstorage",
        method: "post",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SeedStorage", id: arg.id },
      ],
    }),
    deleteSeedStorage: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/seedstorage/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SeedStorage", id: arg.id },
      ],
    }),
    seedStorageByUser: builder.query({
      query: ({ id, token }) => ({
        url: `/api/user/${id}/seedstorage`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "SeedStorage",
        ...result.map(({ id }) => ({ type: "SeedStorage", id })),
      ],
    }),
  }),
});

export const {
  useAddSeedStorageMutation,
  useDeleteSeedStorageMutation,
  useSeedStorageByUserQuery,
} = seedStorageApiSlice;
