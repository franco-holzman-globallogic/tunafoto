"use client";

import { useMemo } from "react";
import GalleryImage from "./GalleryImage";
import { useColumns } from "./useColumns";

interface GalleryProps {
  imagenes: string[];
  visibleCount: number;
  categoryName: string;
}

export default function Gallery({ imagenes, visibleCount, categoryName }: GalleryProps) {
  const colCount = useColumns(3);
  const visible = imagenes.slice(0, visibleCount);

  const columns = useMemo(() => {
    const cols: string[][] = Array.from({ length: colCount }, () => []);
    visible.forEach((src, i) => cols[i % colCount].push(src));
    return cols;
  }, [visible, colCount]);

  return (
    <div className="flex gap-4 max-w-6xl mx-auto px-4 sm:px-6">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 min-w-0">
          {col.map((src, i) => (
            <GalleryImage key={src} src={src} alt={`${categoryName} — foto ${i + 1}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
