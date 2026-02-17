import MapSvgIcon from "@/components/Map/MapIcon";
import MapWrapper from "@/components/Map/MapWrapper";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <MapWrapper />
      </div>
    </>
  );
}
