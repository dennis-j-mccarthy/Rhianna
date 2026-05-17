"use client";

import { useState } from "react";

const filters = ["All Essays", "Astrology", "Healing", "Animal Communication", "Reflection"];

export default function FilterRow() {
  const [active, setActive] = useState(0);
  return (
    <div className="filter-row">
      {filters.map((label, i) => (
        <button
          key={label}
          type="button"
          className={`filter ${i === active ? "active" : ""}`}
          onClick={() => setActive(i)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
