/* eslint-disable @next/next/no-img-element */
import React from "react";

type Tone =
  | "base"
  | "inherit"
  | "subdued"
  | "caution"
  | "warning"
  | "critical"
  | "interactive"
  | "info"
  | "success"
  | "primary"
  | "emphasis"
  | "magic"
  | "textCaution"
  | "textWarning"
  | "textCritical"
  | "textInfo"
  | "textSuccess"
  | "textPrimary"
  | "textMagic";

export interface IconProps {
  source: string;
  tone?: Tone;
  accessibilityLabel?: string;
}

export function Icon({ source, tone, accessibilityLabel }: IconProps) {
  let sourceType: "function" | "placeholder" | "external";
  if (typeof source === "function") {
    sourceType = "function";
  } else if (source === "placeholder") {
    sourceType = "placeholder";
  } else {
    sourceType = "external";
  }

  if (
    tone &&
    sourceType === "external" &&
    process.env.NODE_ENV === "development"
  ) {
    console.warn(
      "Recoloring external SVGs is not supported. Set the intended color on your SVG instead."
    );
  }

  const SourceComponent = source;
  const contentMarkup = {
    function: (
      <SourceComponent aria-hidden="true" {...{ viewBox: "1 1 18 18" }} />
    ),
    placeholder: <div />,
    external: <img src={`${source}`} alt="" aria-hidden="true" />,
  };

  return <div>{contentMarkup[sourceType]}</div>;
}
