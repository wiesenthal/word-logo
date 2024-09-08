import ImageForm from "~/components/ImageForm";
import RotatingLogo from "~/components/RotatingLogo";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-row items-center justify-center gap-0">
          <h1 className="-mr-10 mb-1 text-5xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
            word{" "}
          </h1>
          <RotatingLogo />
        </div>

        <ImageForm />
      </div>
    </main>
  );
}
