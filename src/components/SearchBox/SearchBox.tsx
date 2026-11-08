import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (search: string) => void;
}

function SearchBox({ search, onSearch }: SearchBoxProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
  }

  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        defaultValue={search}
        onChange={handleChange}
      />
    </>
  );
}

export default SearchBox;
