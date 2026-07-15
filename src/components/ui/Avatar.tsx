import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  online?: boolean;
  ring?: boolean;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  size = 40,
  online,
  ring,
  className = "",
}: AvatarProps) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`h-full w-full rounded-full object-cover ${
          ring ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white" : ""
        }`}
        unoptimized
      />
      {online && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
      )}
    </span>
  );
}