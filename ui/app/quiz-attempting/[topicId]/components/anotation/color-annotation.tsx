import { cn } from "@/lib/utils";

interface ColorAnnotationProps {
  colorClassName: string;
  description: string;
}
const ColorAnnotation = ({
  colorClassName,
  description,
}: ColorAnnotationProps) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className={cn("h-4 w-4", colorClassName)}></div>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

export default ColorAnnotation;
