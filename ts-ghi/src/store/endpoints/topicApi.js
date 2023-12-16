import { apiSlice } from "../apiSlice";

export const topicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTopic: builder.mutation({
      query: ({ info, token }) => ({
        url: "/api/topics",
        method: "post",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Topics", id: arg.id }],
    }),
    getAllTopics: builder.query({
      query: () => ({
        url: "/api/topics",
      }),
      providesTags: (result = [], error, arg) => [
        "Topics",
        ...result.map(({ id }) => ({ type: "Topics", id })),
      ],
    }),
    deleteTopic: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/topics/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Topics", id: arg.id }],
    }),
  }),
});

export const {
  useAddTopicMutation,
  useGetAllTopicsQuery,
  useDeleteTopicMutation,
} = topicApiSlice;
