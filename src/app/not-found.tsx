import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16">
      <h1 className="font-display text-4xl">That page is not in the guide.</h1>
      <Link href="/" className="mt-4 inline-block text-gold">
        Back to the classes
      </Link>
    </section>
  );
}
