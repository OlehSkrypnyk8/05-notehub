import { useState } from "react";
import type { FormEvent } from "react";
import css from "./SearchBox.module.css";

interface SearchBarProps {
  readonly onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className={css.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={css.input}
      />
    </form>
  );
}
