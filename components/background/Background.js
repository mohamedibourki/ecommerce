"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

export function SparklesPreview({ children }) {
    return (
        <div className="h-screen relative w-full bg-black flex flex-col overflow-hidden">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
            <div className="text-white z-0">
                {children}
            </div>
        </div>
    );
}