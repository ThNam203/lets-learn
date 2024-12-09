import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
  onClick?: () => void;
}
export default function Avatar({ className, onClick }: Props) {
  return (
    <Image
      src="/default-user.png"
      alt="avatar"
      width={1000}
      height={1000}
      className={cn(
        "w-16 rounded-full object-cover overflow-hidden transition-all duration-200 cursor-pointer",
        className
      )}
      onClick={onClick}
    />
  );
}
