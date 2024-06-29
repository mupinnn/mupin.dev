import { SocialLinks } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="mb-2 inline-flex flex-col gap-2 text-5xl font-extrabold leading-[40px]">
          <span className="text-2xl">Yo! I'm</span>Ahmad
          <br /> Muwaffaq,
        </h1>
        <p className="text-xs">
          you can call me 'Faqih' if calling with my full name is too complicated, XD.
        </p>
        <p className="text-xs">I'am a web developer that tinkering the front of the web.</p>
      </div>
      <SocialLinks />
    </div>
  );
}
