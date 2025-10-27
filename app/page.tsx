import { ImageCard } from "@/components/ImageCard";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col min-h-screen gap-8 flex-1 justify-center items-center bg-white dark:bg-black">
        <section className="flex flex-row gap-4">
          <div className="flex flex-1 w-200 border-1 border-gray-500"></div>


          <div className="flex flex-col max-w-200">
            <h1 className="text-5xl bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">Jordan Dexter</h1>
            <h2>Responsive. Clean. Professional.</h2>
            <p>
              I'm an experienced web developer with a keen eye for clean, elegant design. Feel free to poke around at some of the work I've created over the years.

              <br></br><br></br>
              These are some of my favorite projects.
            </p>
          </div>
        </section>
        <section id="hero" className="flex w-full items-center justify-center">
          <ImageCard path={'/lfg/lfg-1.png'} />
        </section>
      </main>
    </div>
  );
}
