import "./App.css";
import { Navbar, Content, CountryDetailed } from "./components";
import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

export const ThemeContext = createContext();
const startUpTheme = localStorage.getItem("theme") ?? "light";

function App() {
  const [theme, setTheme] = useState(startUpTheme);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  localStorage.setItem("theme", theme);
  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const data = await fetch("https://restcountries.com/v3.1/all");
        const json = await data.json();
        setAllCountries(json);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Fetch data error");
      }
    };
    fetchAllCountries();
  }, []);
  const toggleTheme = () => {
    const t = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", t);
    setTheme(t);
  };
  return (
    <div className="app" id={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Content
                allCountries={allCountries}
                setAllCountries={(n) => setAllCountries(n)}
                loading={loading}
              />
            }
          />
          <Route path="/:id" element={<CountryDetailed />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
