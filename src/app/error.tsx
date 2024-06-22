"use client"

export default function Error({ error, reset }: {
  error: Error,
  reset: () => void
}) {
  console.log("the error page is now being rendered")
  return (
    <html><body>
      <section>
        <div className="w-screen h-screen bg-white text-black flex justify-center items-center
          text-4xl">
          {error.message}</div>
        <button onClick={() => reset()}>Try Again!</button></section>
    </body></html>
  )
}
