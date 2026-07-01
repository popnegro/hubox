import React from "react";

type SimpleTableProps = {
  headers: string[];
  rows: (string | number)[][];
};

export function SimpleTable({ headers, rows }: SimpleTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="min-w-full divide-y-2 divide-line bg-surface text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="whitespace-nowrap px-4 py-2 text-left font-medium text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, i) => (
            <tr key={row[0] || i}>
              {row.map((cell, j) => (<td key={`${row[0]}-${j}`} className="whitespace-nowrap px-4 py-2 text-muted">{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}