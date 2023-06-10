import styles from "./Search_filter.module.css";
import searchIcon from "../../assets/search.png";

const Search_filter = ({
  filter,
  setFilter,
  theme,
  searchQuery,
  setSearchQuery,
}) => {
  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div
      className={styles.container}
      style={theme === "dark" ? { "--placeholder-color": "white" } : null}
    >
      <div className={styles.inputContainer}>
        <img
          src={searchIcon}
          alt="search"
          className={styles.icon}
          style={theme === "dark" ? { filter: "invert(100%)" } : null}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Search for a country"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={
            theme === "dark"
              ? {
                  backgroundColor: "var(--background-dark-secondary",
                  color: "white",
                }
              : null
          }
        />
      </div>

      <select
        value={filter}
        onChange={handleSelectChange}
        className={styles.dropbox}
        style={
          theme === "dark"
            ? {
                backgroundColor: "var(--background-dark-secondary",
                color: "white",
              }
            : null
        }
        onChangeCapture={(e) => setFilter(e.target)}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        <option value="africa">Africa</option>
        <option value="americas">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
        {filter ? <option value="">Remove filter</option> : ""}
      </select>
    </div>
  );
};
export default Search_filter;
