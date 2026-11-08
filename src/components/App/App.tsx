import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isSuccess } = useQuery({
    queryKey: ["note", page, searchQuery],
    queryFn: () => fetchNotes(page, 12, searchQuery),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((search: string) => {
    setSearchQuery(search);
    setPage(1);
  }, 1000);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={searchQuery} onSearch={handleSearch} />
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              totalPage={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
        {isSuccess && data.notes.length !== 0 && (
          <NoteList notes={data.notes} />
        )}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
