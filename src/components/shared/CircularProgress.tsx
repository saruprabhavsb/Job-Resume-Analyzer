import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showLabel?: boolean;
  label?: string;
}

const sizeConfig = {
  sm: { size: 60, stroke: 4, fontSize: "text-sm" },
  md: { size: 80, stroke: 5, fontSize: "text-lg" },
  lg: { size: 120, stroke: 6, fontSize: "text-2xl" },
  xl: { size: 160, stroke: 8, fontSize: "text-4xl" },
};

export function CircularProgress({
  value,
  size = "md",
  className,
  showLabel = true,
  label,
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const config = sizeConfig[size];
  const radius = (config.size - config.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = () => {
    if (value >= 80) return "stroke-success";
    if (value >= 60) return "stroke-primary";
    if (value >= 40) return "stroke-secondary";
    return "stroke-destructive";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          strokeWidth={config.stroke}
          className="fill-none stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          className={cn("fill-none transition-all duration-1000 ease-out", getColor())}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", config.fontSize)}>{Math.round(animatedValue)}%</span>
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
        </div>
      )}
    </div>
  );
}
