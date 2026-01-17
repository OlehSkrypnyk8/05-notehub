import { useEffect, useState, useCallback } from "react";
import { fetchNotes, deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import SearchBar from "../SearchBox/SearchBox";
import LoadingIndicator from "../Loading/Loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchNotes({
          page: pageNumber,
          perPage: 5,
          search,
        });
        setNotes(res.notes);
        setTotalPages(res.totalPages);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err) || "Помилка при завантаженні нотаток");
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    loadNotes(page);
  }, [page, search, loadNotes]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    setNotes((prev) => prev.filter((note) => note.id !== id));

    try {
      await deleteNote(id);
    } catch (err) {
      console.error("Помилка видалення нотатки:", err);
      setError("Не вдалося видалити нотатку");
      loadNotes(page);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadNotes(page);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBar onSearch={(value) => setSearchInput(value)} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={(selectedPage) => setPage(selectedPage)}
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
          <NoteForm onSuccess={handleFormSuccess} />
        </Modal>
      )}

      <main>
        {loading && <LoadingIndicator overlay={true} />}

        {error && (
          <ErrorMessage
            error={error}
            onRetry={() => loadNotes(page)}
            title="Не вдалося завантажити нотатки"
            type="error"
          />
        )}

        {!loading &&
          !error &&
          (notes.length > 0 ? (
            <NoteList notes={notes} onDelete={handleDelete} />
          ) : (
            <p>No notes</p>
          ))}
      </main>
    </div>
  );
}

export default App;
