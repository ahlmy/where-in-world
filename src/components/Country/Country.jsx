import styles from "./Country.module.css";
import { Link } from "react-router-dom";

const Country = ({ theme, countryData }) => {
  const name = countryData.name.common;
  const population = countryData.population;
  const region = countryData.region;
  const capital = countryData.capital;
  const flag = countryData.flags.png;
  return (
    <Link to={`/${name}`} className={styles.countryLink}>
      <div
        className={styles.country}
        style={
          theme === "dark"
            ? { backgroundColor: "var(--background-dark-secondary)" }
            : null
        }
      >
        <div className={styles.imageContainer}>
          <img src={flag} alt="tr" className={styles.img} />
        </div>

        <div className={styles.details}>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.desc}>
            <h4>
              Population: <span className={styles.span}>{population}</span>
            </h4>
            <h4>
              Region: <span className={styles.span}>{region}</span>
            </h4>
            <h4>
              Capital: <span className={styles.span}>{capital}</span>
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Country;
