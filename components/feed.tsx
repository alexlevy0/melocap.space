import { FlatList, Platform } from "react-native";

import type { Post } from "@/data";
import { PostCmp } from "./post";
// import useScrollToTop from "./useScrollToTopWithOffset";
import { useRef } from "react";

export function Feed({
	data,
	...props
}: { data: Post[] } & Partial<FlatList["props"]>) {
	const ref = useRef<FlatList>(null);
	// useScrollToTop(
	// 	ref,
	// 	Platform.select({
	// 		ios: -150,
	// 		default: 0,
	// 	}),
	// );
	return (
		<FlatList
			ref={ref}
			scrollToOverflowEnabled
			style={{ flex: 1 }}
			{...props}
			data={data}
			renderItem={({ item }) => <PostCmp item={item} />}
		/>
	);
}
