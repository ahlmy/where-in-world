import styles from "./CountryDetailed.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../../App";
import { Skeleton } from "@mui/material";
import arrow from "../../../assets/arrow.png";

const CountryDetailed = () => {
  const { theme } = useContext(ThemeContext);
  const params = useParams();
  const [countryData, setCountryData] = useState();
  const [loading, setLoading] = useState(true);
  const [borderNames, setBorderNames] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        `https://restcountries.com/v3.1/name/${params.id}`
      );
      const json = await resp.json();
      setLoading(false);
      return setCountryData(json[0]);
    };
    getData();
  }, []);
  useEffect(() => {
    const borders = countryData?.borders ?? null;
    if (borders) {
      const getData = async (code) => {
        const resp = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        const json = await resp.json();
        return json[0].name.common;
      };
      const getBorderNames = async () => {
        const borderProm = borders.map((code) => getData(code));
        const bs = await Promise.all(borderProm);
        setBorderNames(bs);
      };
      getBorderNames();
    }
  }, [countryData]);
  if (loading)
    return (
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <div className={styles.img}>
            <Skeleton variant="rectangular" height={300} />
          </div>
        </div>
        <div className={styles.content} style={{ gap: "1.5rem" }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  const name = countryData.name.common;
  const population = countryData.population;
  const region = countryData.region ?? "No region";
  const capital = countryData.capital ?? "No capital";
  const flag = countryData.flags.png;
  const nativeName =
    Object.values(countryData.name.nativeName ?? { a: "" })[0].common ??
    "No native name";
  const subRegion = countryData.subregion ?? "No sub region";
  const tld = countryData.tld[0] ?? "No top level domain";
  const currencies = Object.values(countryData.currencies ?? { a: "" }).map(
    (c) => c.name
  );
  const languages = countryData.languages
    ? Object.values(countryData.languages)
    : ["No languages"];
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to={"/"} className={styles.link}>
          <button
            type="button"
            className={styles.backBtn}
            style={
              theme === "dark"
                ? {
                    backgroundColor: "var(--background-dark-secondary)",
                    color: "#fff",
                  }
                : null
            }
          >
            <img
              src={arrow}
              alt="arrow"
              className={styles.arrow}
              style={theme === "dark" ? { filter: "invert(100%)" } : null}
            />
            <p>Back</p>
          </button>
        </Link>
        <img src={flag} alt="flag" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.title}>
            <h2>{name}</h2>
          </div>
          <div className={styles.topContent}>
            <div className={styles.topLeft}>
              <div className={styles.tlDesc}>
                <p>
                  Native Name: <span>{nativeName}</span>
                </p>
                <p>
                  Population: <span>{population}</span>
                </p>
                <p>
                  Region: <span>{region}</span>
                </p>
                <p>
                  Sub Region: <span>{subRegion}</span>
                </p>
                <p>
                  Capital: <span>{capital}</span>
                </p>
              </div>
            </div>
            <div className={styles.topRight}>
              <p>
                Top Level Domain: <span>{tld}</span>
              </p>
              <p>
                Currencies:{" "}
                <span>
                  {currencies[0] === undefined
                    ? "No currencies"
                    : currencies.join(", ")}
                </span>
              </p>
              <p>
                Languages: <span>{languages.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>
        {borderNames ? (
          <div className={styles.bottom}>
            <p>Border countries:</p>
            <ul className={styles.borders}>
              {borderNames.map((b, index) => (
                <li
                  key={Date.now() + index}
                  className={styles.border}
                  style={
                    theme === "dark"
                      ? {
                          backgroundColor: "var(--background-dark-secondary)",
                        }
                      : null
                  }
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default CountryDetailed;
