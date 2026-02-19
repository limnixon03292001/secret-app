"use client";

import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import MapSvgIcon from "./MapIcon";
import React, { useRef } from "react";

type ControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
};

const Controls = ({ zoomIn, zoomOut, resetTransform }: ControlsProps) => (
  <>
    <button onClick={() => zoomIn()}>+</button>
    <button onClick={() => zoomOut()}>-</button>
    <button onClick={() => resetTransform()}>x</button>
  </>
);

export default function Mapv2() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const zoomToImage = () => {
    if (transformComponentRef.current) {
      const { zoomToElement } = transformComponentRef.current;
      zoomToElement("imgExample");
    }
  };

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
      ref={transformComponentRef}
      smooth={true}
    >
      {(utils) => (
        <React.Fragment>
          {/* <Controls {...utils} /> */}
          <TransformComponent
            contentStyle={{
              width: "100%",
              maxWidth: "1100px",
            }}
          >
            <div className="p-5">
              <MapSvgIcon />
            </div>

            {/* <div onClick={zoomToImage}>Example text</div> */}
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}
