
export default function AuthErrorPage({ searchParams }: {
  searchParams: {
    error: string,
  }
}) {
  return (
    <section>
      <div className="bg-black text-white h-[100vh] w-screen flex justify-center items-center
          text-4xl">
        <span>Error: {searchParams.error}</span>
      </div>
    </section>
  )
}
