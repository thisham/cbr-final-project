import { apiBaseUrl } from "@modules/configs/url";
import { buttonVariants } from "@modules/components/ui/button";
import Link from "next/link";

type Data = {
  message: string;
};

export default async function Home() {
  const res = await fetch(`${apiBaseUrl}/v1`);
  const data = await (res.json() as Promise<Data>);

  return (
    <div
      className={"w-screen h-screen flex items-center justify-center flex-col"}
    >
      <h1 className={"text-4xl text-center mb-8"}>{data.message}</h1>

      <Link
        href={"/questions"}
        className={buttonVariants({ variant: "default" })}
      >
        Mulai
      </Link>
    </div>
  );
}
