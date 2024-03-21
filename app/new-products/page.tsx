"use client"
import { SparklesCore } from "@/components/ui/sparkles";

export default function NewProducts() {
    return <>
        <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-screen"
                    particleColor="#FFFFFF"
                />
            </div>
        </div>
    </>
}
