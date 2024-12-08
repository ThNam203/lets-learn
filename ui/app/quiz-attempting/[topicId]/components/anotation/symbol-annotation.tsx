import { ReactNode } from "react";

interface SymbolAnnotationProps {
  symbol: ReactNode;
  description: string;
}
const SymbolAnnotation = ({ symbol, description }: SymbolAnnotationProps) => {
  return (
    <div className="flex flex-row gap-3">
      {symbol}
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

export default SymbolAnnotation;
