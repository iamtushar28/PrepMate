import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <section className="min-h-screen h-auto w-full bg-zinc-50/50">
      <Navbar />
      <Hero />
    </section>
  );
}
