"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.log("the error page is now being rendered");
  return (
    <html>
      <body>
        <section>
          <div
            className="w-screen h-screen bg-black text-white  flex flex-col justify-center items-center
          text-3xl space-y-3"
          >
            {error.message}
          </div>
          <Button onClick={() => reset()}>Try Again!</Button>
        </section>
      </body>
    </html>
  );
}
