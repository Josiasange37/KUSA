import React from "react";

interface AfricanMotifPatternProps {
  className?: string;
  variant?: "dark" | "gold" | "subtle" | "white" | "forest";
  opacity?: number;
}

export const AfricanMotifPattern: React.FC<AfricanMotifPatternProps> = ({
  className = "h-2 w-full",
  variant = "gold",
  opacity,
}) => {
  const primaryColor =
    variant === "gold"
      ? "#D4AF37"
      : variant === "dark"
      ? "#0D1B2A"
      : variant === "forest"
      ? "#0E3B33"
      : variant === "white"
      ? "#FFFFFF"
      : "#E5E7EB";

  const secondaryColor =
    variant === "gold"
      ? "#0E3B33"
      : variant === "dark"
      ? "#D4AF37"
      : variant === "forest"
      ? "#D4AF37"
      : variant === "white"
      ? "#D4AF37"
      : "#0E3B33";

  const defaultOpacity =
    opacity !== undefined
      ? opacity
      : variant === "subtle"
      ? 0.25
      : variant === "white"
      ? 0.6
      : 0.85;

  const reactId = React.useId();
  const patternId = `kusa-pat-${variant}-${reactId.replace(/:/g, "")}`;

  return (
    <div className={`overflow-hidden flex items-center select-none ${className}`}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 24"
        preserveAspectRatio="repeat-x"
        aria-hidden="true"
      >
        <pattern
          id={patternId}
          width="48"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          {/* Authentic West & Central African geometric diamond & chevron rhythm */}
          <polygon
            points="0,12 12,0 24,12 12,24"
            fill={primaryColor}
            fillOpacity={defaultOpacity}
          />
          <polygon
            points="24,12 36,0 48,12 36,24"
            fill={secondaryColor}
            fillOpacity={defaultOpacity * 0.75}
          />
          {/* Inner sacred geometry accents */}
          <polygon
            points="6,12 12,6 18,12 12,18"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="0.8"
            strokeOpacity={defaultOpacity}
          />
          <circle cx="12" cy="12" r="2" fill={secondaryColor} fillOpacity={defaultOpacity} />
          <circle cx="36" cy="12" r="2" fill={primaryColor} fillOpacity={defaultOpacity} />
          {/* Fine horizontal balance lines */}
          <line
            x1="0"
            y1="12"
            x2="48"
            y2="12"
            stroke={primaryColor}
            strokeWidth="0.5"
            strokeOpacity={defaultOpacity * 0.4}
          />
        </pattern>
        <rect width="100%" height="24" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export const AfricanMotifDivider: React.FC<{
  className?: string;
  theme?: "light" | "dark" | "gold";
}> = ({ className = "my-12", theme = "light" }) => {
  const lineColor =
    theme === "dark" ? "bg-white/10" : theme === "gold" ? "bg-[#D4AF37]/30" : "bg-[#0E3B33]/15";
  const iconColor =
    theme === "dark" ? "text-[#D4AF37]" : theme === "gold" ? "text-[#D4AF37]" : "text-[#0E3B33]";

  return (
    <div className={`flex items-center justify-center space-x-4 max-w-md mx-auto select-none ${className}`}>
      <div className={`flex-1 h-[1px] ${lineColor}`} />
      <div className="flex items-center space-x-1.5 px-2">
        <span className={`w-1.5 h-1.5 rotate-45 border border-[#D4AF37] ${iconColor}`} />
        <span className={`w-2.5 h-2.5 rotate-45 bg-[#D4AF37]/80`} />
        <span className={`w-1.5 h-1.5 rotate-45 border border-[#D4AF37] ${iconColor}`} />
      </div>
      <div className={`flex-1 h-[1px] ${lineColor}`} />
    </div>
  );
};

export const AfricanWatermarkBg: React.FC<{
  className?: string;
  opacity?: number;
}> = ({ className = "", opacity = 0.035 }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="african-watermark-pattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Diamond matrix */}
            <path
              d="M40 0 L80 40 L40 80 L0 40 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.2"
            />
            <path
              d="M40 12 L68 40 L40 68 L12 40 Z"
              fill="none"
              stroke="#0E3B33"
              strokeWidth="0.8"
            />
            <circle cx="40" cy="40" r="3" fill="#D4AF37" />
            <path
              d="M0 0 L20 20 M80 0 L60 20 M0 80 L20 60 M80 80 L60 60"
              stroke="#D4AF37"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#african-watermark-pattern)" />
      </svg>
    </div>
  );
};
