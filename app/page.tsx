import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <section className="min-h-screen h-auto w-full">
      <Navbar />
      <Hero />
    </section>
  );
}
