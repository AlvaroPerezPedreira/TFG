import "./styles/home.css";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import SearchBar from "./GlobalComponents/SearchBar";

const Search = () => {
  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="home-container">
          <SearchBar />
        </div>
      </Suspense>
    </>
  );
};

export default Search;
