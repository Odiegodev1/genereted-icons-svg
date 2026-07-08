import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  backgroundColor?: string;
  variant?: "sem" | "square";
  borderRadius?: number;
}

const BRAND_COLOR = "#6E0AD6";

export function Olx({
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
        <rect width={60} height={60} fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M15.2418 38.5437C12.4547 38.5437 10.5335 36.2353 10.5335 32.824C10.5335 29.3798 12.4547 27.0726 15.2418 27.0726C18.0265 27.0726 19.9502 29.3798 19.9502 32.7911C19.9502 36.2353 18.0277 38.5437 15.2418 38.5437ZM15.2418 42.8649C20.3984 42.8649 24.4973 38.5754 24.4973 32.7911C24.4973 27.0726 20.6219 22.7515 15.2418 22.7515C10.0852 22.7502 5.98511 27.0384 5.98511 32.8228C5.98511 38.6402 9.86049 42.8636 15.2418 42.8636" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M28.3091 35.1959H37.1481C37.7576 35.1959 38.1094 34.8392 38.1094 34.2212V31.3938C38.1094 30.777 37.7576 30.4191 37.1481 30.4191H31.2233V18.396C31.2233 17.7792 30.8716 17.4214 30.2621 17.4214H27.3479C26.7397 17.4214 26.3867 17.7792 26.3867 18.396V33.2466C26.3867 34.5144 27.0597 35.1959 28.3091 35.1959Z" fill="#8CE563" /><path fillRule="evenodd" clipRule="evenodd" d="M40.32 42.573L45.6366 36.3661L50.7932 42.573C51.2415 43.1251 51.8179 43.1251 52.3297 42.6707L54.4121 40.8179C54.9251 40.3624 54.9886 39.7786 54.5086 39.2583L48.7755 32.7594L53.9956 26.8126C54.4439 26.2923 54.4109 25.7402 53.9004 25.2529L51.9462 23.466C51.4332 22.9775 50.8567 23.0105 50.4085 23.5638L45.6366 29.1845L40.7683 23.5625C40.32 23.0435 39.7423 22.9775 39.2306 23.4648L37.2129 25.2847C36.6999 25.7732 36.6682 26.2923 37.1481 26.8456L42.466 32.7911L36.6682 39.323C36.1882 39.875 36.2529 40.4283 36.7646 40.8827L38.7823 42.6707C39.2953 43.1251 39.8706 43.0921 40.32 42.573Z" fill="#F28000" />
      </g>
    </svg>
  );
}
