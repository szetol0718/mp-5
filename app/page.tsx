import NewLinkForm from "@/components/NewLinkForm";
import getAllLinks from "@/lib/getAllLinks";

interface Link {
  _id: string;
  alias: string;
  url: string;
}

export default async function Home() {
  const links = (await getAllLinks()) as unknown as Link[];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded space-y-6">
        <h1 className="text-3xl font-bold text-center">CS391 URL Shortener</h1>

        <NewLinkForm />

        {links.length > 0 && (
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-3">Existing Short Links</h2>
            <ul className="space-y-2">
              {links.map((link: Link) => (
                <li key={link._id} className="border p-3 rounded bg-gray-50">
                  <a
                    href={`/r/${link.alias}`}
                    className="text-blue-600 font-semibold underline"
                    target="_blank"
                  >
                    /r/{link.alias}
                  </a>
                  <p className="text-sm text-gray-600 break-all">→ {link.url}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
