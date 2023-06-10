import { ThemeContext } from "../../App";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      id={theme === "dark" ? "dark-secondary" : "light"}
    >
      <h1 className={styles.title}>Where in the world?</h1>
      <div className={styles.mode}>
        <img
          src={theme === "light" ? sun : moon}
          alt="light"
          className={styles.modeImg}
          onClick={toggleTheme}
          style={theme === "dark" ? { filter: "invert(100%)" } : null}
        />
        <h4>Dark Mode</h4>
      </div>
    </div>
  );
};
export default Navbar;
