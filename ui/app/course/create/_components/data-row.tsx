interface Props {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  desc: string;
  errorMessage?: string;
}

export default function DataRow({
  label,
  htmlFor,
  children,
  desc,
  errorMessage,
}: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      {children}
      {errorMessage ? (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      ) : (
        <p className="text-sm text-gray-500">{desc}</p>
      )}
    </div>
  );
}
