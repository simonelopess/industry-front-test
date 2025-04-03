import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

export const metadata = {
  title: "Política de Privacidade e Política de Cookies | Industry Club",
  description:
    "Leia esta política de privacidade e cookies para compreender as práticas do Industry Club relativamente aos seus dados pessoais e a forma como iremos tratá-los.",
}

export default async function Page() {
  const api = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/politica-de-privacidade?populate=*`);

  const { data } = await api.json()
  const policy = data

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="w-full">
        {policy &&
          policy.banner.map((item) => (
            <div
              key={item.id}
              className="bg-cover bg-center h-80 flex items-center justify-center p-8"
              style={{ backgroundImage: `url(${item.backgroundUrl})` }}
            >
              <h1 className="text-white text-4xl">{item.title}</h1>
            </div>
          ))}
        <h2 className="text-black text-2xl text-center mt-8">{policy?.subtitle}</h2>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {policy?.privacy &&
            policy?.privacy.map((text) => (
              <div key={text.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{text?.title}</h3>
                <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-blue-600 underline hover:text-blue-800"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      // Custom component for underlined text
                      u: ({ node, ...props }) => <span {...props} className="underline" />,
                      br: ({ node, ...props }) => <span {...props} className="py-2 block" />,
                    }}
                  >{text?.description}</ReactMarkdown>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}

