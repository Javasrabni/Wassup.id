import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center">

      {/* BANNER */}
      <div className="relative w-full h-60 rounded-xl overflow-hidden flex items-center justify-center">
        <Image src={'/bg.jpg'} alt="Banner" fill priority quality={90} className="object-cover blur-[2px]" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative flex flex-col gap-4 items-center justify-center">
          <h1 className="text-white text-2xl font-bold">Ngobrolin dunia ala gaya kita!</h1>
          <div>
            <input
              type="search"
              // name="q"
              placeholder="Cari artikel..."
              className="border rounded px-3 h-10 w-xs outline-none bg-gray-100 text-black"
            />
            <button className="ml-2 px-3 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Cari
            </button>
          </div>
        </div>
      </div>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque totam nam eos repellat necessitatibus labore, delectus ducimus fugit tempore voluptatem voluptas porro minima odit accusamus, obcaecati, molestias vel animi?</p>

    </div>
  );

}
