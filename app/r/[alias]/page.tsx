import getLinkByAlias from "@/lib/getLinkByAlias";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ alias: string }>;
};

export default async function RedirectAlias({ params }: Props) {
  const { alias } = await params; 

  const data = await getLinkByAlias(alias);

  if (data) {
    redirect(data.url);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-red-500 text-2xl font-bold">Alias not found.</h1>
    </div>
  );
}