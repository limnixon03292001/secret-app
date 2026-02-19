import MapSvgIcon from "@/components/Map/MapIcon";
import Mapv2 from "@/components/Map/Mapv2";
import MapWrapper from "@/components/Map/MapWrapper";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        {/* Leaflet */}
        {/* <MapWrapper /> */}

        {/* zoom pan pinch */}
        <Mapv2 />
      </div>
    </>
  );
}
