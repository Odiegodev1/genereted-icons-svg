import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  backgroundColor?: string;
  variant?: "sem" | "square";
  borderRadius?: number;
}

const BRAND_COLOR = "#FF6914";

export function Shoptime({
  size = 60,
  color,
  backgroundColor,
  variant = "sem",
  borderRadius = 10,
  className,
  ...props
}: IconProps) {
  const bg =
    variant === "square"
      ? backgroundColor || BRAND_COLOR
      : "transparent";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {variant === "square" && (
        <rect
          width="60"
          height="60"
          rx={borderRadius}
          fill={bg}
        />
      )}

      <g fill={color || (variant === "square" ? "#fff" : BRAND_COLOR)}>
        <rect width={60} height={60} fill="currentColor" /><path d="M43.4998 43.2695H31.0691L43.4998 30.8496V43.2695Z" fill="currentColor" stroke="white" /><path d="M42.7915 15.9788L16.1821 42.5618V29.8215L30.0278 15.9788H42.7915Z" fill="currentColor" stroke="white" /><path d="M43.4995 29.4358L29.6528 43.2698H16.8901L43.4995 16.6848V29.4358Z" fill="white" stroke="white" /><path d="M28.6138 15.9788L16.1821 28.4075V15.9788H28.6138Z" fill="white" stroke="white" />
      </g>
    </svg>
  );
}
