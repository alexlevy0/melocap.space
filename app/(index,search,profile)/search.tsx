import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { Feed } from "@/app/components/feed";
import { posts } from "@/app/data";

export default function Search() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string }>();
  const filteredPosts = !params.q
    ? posts
    : posts.filter((post) =>
        post.post.toLowerCase().includes(params.q.toLowerCase())
      );
  return (
    <>
      <Stack.Screen
        options={{
          title: "Search",
          headerSearchBarOptions: {
            onChangeText: (event) => {
              // Update the query params to match the search query.
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        }}
      />
      <Feed data={filteredPosts} contentInsetAdjustmentBehavior="automatic" />
    </>
  );
}
