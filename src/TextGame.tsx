"use client";
import { useState } from "react";
import GameEngine from "./GameEngine";
import IntroScene from "./IntroScene";


export default function TextGame() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="text-white font-mono p-6">
      {!hasStarted ? (
        <IntroScene onBegin={() => setHasStarted(true)} />
      ) : (
        <GameEngine />
      )}
    </div>
  );
}