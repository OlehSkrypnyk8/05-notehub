import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";

import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import LoadingIndicator from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 5,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchInput} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setShowForm(true)}
        >
          Create Note+
        </button>
      </header>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <NoteForm onSuccess={() => setShowForm(false)} />
        </Modal>
      )}

      <main>
        {isLoading && <LoadingIndicator overlay />}

        {isError && (
          <ErrorMessage
            error={(error as Error).message}
            title="Не вдалося завантажити нотатки"
            type="error"
          />
        )}

        {!isLoading &&
          !isError &&
          (notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes</p>)}
      </main>
    </div>
  );
}

export default App;
