export const metadata  = {
  title: "Sobre o Industry Club | Inovação Empresarial",
  description: "Descubra a missão do Industry Club para acelerar a Indústria 4.0 e a sustentabilidade empresarial através da inovação tecnológica em Portugal.",
}

export default async function Page() {
    const api = await fetch('http://localhost:1337/api/about?populate=*');
    const { data } = await api.json();
    const about = data;

    return (
      <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="w-full">
        {about && 
          <div className="bg-cover bg-center h-80 flex items-center justify-center p-8" style={{ backgroundImage: `url(${about.banner.backgroundUrl})` }}>
          <h1 className="text-white text-4xl" >{about.banner.title}</h1>
        </div>            
        }
      </main>
    </div>
    )
}