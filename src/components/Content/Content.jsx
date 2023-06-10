import styles from "./Content.module.css";
import { Search_filter, Country, Loading } from "../";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App";
import { Grid } from "@mui/material";

const Content = ({ allCountries, setAllCountries, loading }) => {
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useContext(ThemeContext);
  const [filteredCountries, setFilteredCountries] = useState();
  const [page, setPage] = useState(0);
  useEffect(() => {
    let availableCountries = [];
    if (filter === "" && searchQuery === "") {
      return setFilteredCountries([...allCountries]);
    }
    if (filter !== "" && searchQuery === "") {
      availableCountries = allCountries.filter(
        (c) => c.region.toLowerCase() === filter
      );
      return setFilteredCountries(availableCountries);
    } else if (filter === "" && searchQuery !== "") {
      const s = searchQuery.toLowerCase();
      availableCountries = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(s)
      );
      return setFilteredCountries(availableCountries);
    } else if (filter !== "" && searchQuery !== "") {
      availableCountries = allCountries
        .filter((c) => c.region.toLowerCase() === filter)
        .filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return setFilteredCountries(availableCountries);
    }
  }, [filter, searchQuery]);
  const renderLoadingComponents = () => {
    const elems = [];
    for (let i = 0; i < 8; i++) {
      elems.push(
        <Grid item xs={12} sm={6} md={4} lg={3} key={Date.now() + i}>
          <Loading />
        </Grid>
      );
    }
    return elems;
  };
  const convertToPageComponent = (data, index) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={data.name.common + index}>
        <Country theme={theme} countryData={data} />
      </Grid>
    );
  };
  const renderPageComponents = () => {
    if (searchQuery === "" && filter === "") {
      const currentCountries = allCountries
        .slice(page * 52, (page + 1) * 52)
        .map((c, index) => convertToPageComponent(c, index));
      return currentCountries;
    }
    const currentCountries = filteredCountries
      .slice(page * 52, (page + 1) * 52)
      .map((c, index) => convertToPageComponent(c, index));
    return currentCountries;
  };
  const pageLen = () => {
    const p = [];
    for (let i = 0; i < Math.floor(allCountries.length / 50); i++) {
      p.push(i);
    }
    return p;
  };
  return (
    <>
      <div className={styles.container} id={theme}>
        <Search_filter
          filter={filter}
          setFilter={(f) => setFilter(f)}
          theme={theme}
          searchQuery={searchQuery}
          setSearchQuery={(c) => setSearchQuery(c)}
        />
        <Grid container spacing={8}>
          {loading
            ? [...renderLoadingComponents()]
            : [...renderPageComponents()]}
        </Grid>
      </div>
      <ul className={styles.pageNav} id={theme}>
        {pageLen().map((p, index) => (
          <li
            style={
              theme === "dark"
                ? { backgroundColor: "var(--background-dark-secondary)" }
                : null
            }
            onClick={() => setPage(p)}
            key={index}
          >
            <span>{p + 1}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Content;
