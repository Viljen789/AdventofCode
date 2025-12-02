import Link from "next/link";
import React from "react";

const days = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Day ${i + 1}`,
}));

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="grid grid-cols-3 gap-4 ">
        {days.map((d) => (
          <Link
            key={d.id}
            href={`/days/${d.id}`}
            className="px-4 py-2 rounded shadow hover:bg-gray-900"
          >
            {d.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
