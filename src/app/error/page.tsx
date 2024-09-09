"use client";

export default function Error({ searchParams }: { searchParams: { error: string } }) {
  console.log("the error page is now being rendered");
  const params = searchParams.error;
  return (
    <section>
      <div
        className="w-screen h-screen bg-black text-white  flex flex-col justify-center items-center
          text-3xl space-y-3"
      >
        <span>Something Went Wrong!</span> <span>error : {params}</span>
      </div>
    </section>
  );
}
