import { apiBaseUrl } from "@modules/configs/url";
import { Metadata } from "next";
import { ResponseTemplate } from "../api/db";
import Content from "./Content";
import { Toaster } from "@modules/components/ui/toaster";

export const metadata: Metadata = {
  title: "Questions",
  description: "Questions page",
};

export default async function Questions() {
  const res = await fetch(`${apiBaseUrl}/v1/questions`);
  const { data } = await (res.json() as Promise<
    ResponseTemplate<Array<string>, null>
  >);

  return (
    <>
      <div className="w-full min-h-screen px-[20%] pt-16">
        <Content questions={data ?? [""]} />
      </div>
      <Toaster />
    </>
  );
}
