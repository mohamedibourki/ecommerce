"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { SideNav } from "../nav/SideNav";

export function SparklesPreview() {
  return (
    <div className="h-screen relative w-full bg-black flex overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFF"
        />
      </div>
      <div className="z-0">
        <SideNav />
      </div>
    </div>
  );
}