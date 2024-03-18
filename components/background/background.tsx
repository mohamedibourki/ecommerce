"use client";
import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import { ButtonAsChild } from "../button/button";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground>
        <ButtonAsChild />
    </WavyBackground>
  );
}