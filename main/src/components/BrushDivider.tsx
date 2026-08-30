interface BrushDividerProps {
  path: string;
}

export default function BrushDivider({ path }: BrushDividerProps) {
  return (
    <div className="brush-divider" aria-hidden="true">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path d={path} />
      </svg>
    </div>
  );
}
