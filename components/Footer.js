"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-yellow-400 text-center py-6">
      <p>© {year} DrimTuch. All Rights Reserved.</p>
    </footer>
  );
}
