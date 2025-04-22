/*
 * Copyright (c) 2025. Sayat Raykul
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-5xl">404</h1>
      <span>Page not found</span>
      <img
        src="/assets/confused-travolta.gif"
        alt="Not found"
        className="object-cover"
      />
      <Link href="/">Return Home</Link>
    </div>
  );
}
