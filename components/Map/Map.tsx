"use client";

import { MapContainer, SVGOverlay, useMap } from "react-leaflet";
import L from "leaflet";
import MapSvgIcon from "./MapIcon";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

// Fix default marker icon issue in Next.js
// delete (L.Icon.Default.prototype as any)._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

const bounds: [[number, number], [number, number]] = [
  [0, 0],
  [100, 100], // SVG coordinate system
];

//in order for us to access reference of our svg inside, we should wait for the leaflet map to render first
function RenderMap({ svgRef }: any) {
  const map = useMap();

  useEffect(() => {
    console.log("effect", svgRef);

    if (svgRef.current) {
      svgRef.current.addEventListener("click", () => {
        console.log("hey");
      });
    }
  }, [map, svgRef]);

  return null;
}

export default function Map() {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <>
      <MapContainer
        crs={L.CRS.Simple}
        center={[60.125, 36.510419714418774]}
        zoom={3}
        minZoom={3}
        style={{ height: "800px", width: "100%", maxWidth: "950px" }}
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
        maxBounds={bounds}
      >
        <SVGOverlay bounds={bounds}>
          <MapSvgIcon ref={svgRef} />
        </SVGOverlay>
        <RenderMap svgRef={svgRef} />
      </MapContainer>
    </>
  );
}
