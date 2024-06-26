import AuthButton from "@/components/AuthButton";

export default function Header() {
  return (
    <div className="md:px-32 px-2 py-4 w-full flex flex-row items-center justify-between bg-purple-950 text-white mb-6">
      <a className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center" href="/">
        Cuevana6
      </a>
      <div className="self-end">
        <AuthButton/>
      </div>
    </div>
  );
}
