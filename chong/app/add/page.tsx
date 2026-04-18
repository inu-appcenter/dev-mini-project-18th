import ClientAdd from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "할 일 추가",
    description: "할 일 추가 페이지",
};

export default function Add() {
    return <ClientAdd />;
}
