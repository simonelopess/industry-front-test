
async function getInitiativeData(id) {
  console.log(`Buscando dados para: ${id}`)

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    next: { revalidate: 3600 }, // Revalidar a cada hora
  })

  if (!res.ok) {
    return {
      title: id,
      description: `Iniciativa ${id}`,
    }
  }

  return res.json()
}

export async function generateMetadata({ params }) {
  const { id } = params
  const initiative = await getInitiativeData(id)

  return {
    title: `${initiative.title || id} - Industry Club`,
    description: initiative.description || `Iniciativa ${id} - Industry Club`,
  }
}

export default async function About({ params }) {
  const { id } = params

  const initiative = await getInitiativeData(id)
  console.log('initiative', initiative)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>{initiative.title || id}</h1>
        {initiative.description && <p>{initiative.description}</p>}
      </main>
    </div>
  )
}

