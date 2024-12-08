import React from "react";
import { colorAnnotations, symbolAnnotations } from "./static-data";
import SymbolAnnotation from "./symbol-annotation";
import ColorAnnotation from "./color-annotation";
import StickyCard from "../sticky-card/sticky-card";

export default function Anotation() {
  return (
    <StickyCard>
      <h5 className="text-orange-600">Annotation table</h5>
      <div className="flex flex-row justify-center">
        <h6 className="text-pink-600">Symbol</h6>
      </div>
      <div className="flex flex-col gap-2">
        {symbolAnnotations.map((annotation, index) => (
          <SymbolAnnotation
            key={index}
            symbol={annotation.symbol}
            description={annotation.description}
          />
        ))}
      </div>
      <div className="flex flex-row justify-center">
        <h6 className="bg-gradient-to-br from-violet-500 via-cyan-500 via-teal-500 to-yellow-500 inline-block text-transparent bg-clip-text">
          Color
        </h6>
      </div>
      <div className="flex flex-col gap-2">
        {colorAnnotations.map((annotation, index) => (
          <ColorAnnotation
            key={index}
            colorClassName={annotation.colorClassName}
            description={annotation.description}
          />
        ))}
      </div>
    </StickyCard>
  );
}
