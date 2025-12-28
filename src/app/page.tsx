export default function Home() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  return (
    <main>
      <div>Hello world!</div>
    </main>
  );
}
