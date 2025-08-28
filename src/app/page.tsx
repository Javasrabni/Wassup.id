import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Wassup.id</h1>
      <div>
        <input
          type="search"
          // name="q"
          placeholder="Cari artikel..."
          className="border rounded px-3 h-10 w-xs outline-none "
        />
      </div>
    </div>
  );

}
