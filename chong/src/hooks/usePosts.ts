"use client";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/getPosts";

export function usePosts(date: string) {
    return useQuery({
        queryKey: ["posts", date],
        queryFn: async () => await getPosts(date),
        refetchOnMount: true,
        refetchOnReconnect: false,
    });
}
