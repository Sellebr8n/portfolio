export default function Blog({ slug }: { slug: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Blog num {slug}</h1>
      <p className="text-lg text-center">
        Get started by editing <code>pages/index.tsx</code>
      </p>
    </main>
  );
}
