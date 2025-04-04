import "./styles/home.css";
import { Suspense } from "react";
import AppNavbar from "./AppNavbar";
import SearchBar from "./GlobalComponents/SearchBar";
import Footer from "./Footer";

const Search = () => {
  return (
    <>
      <Suspense fallback="loading">
        <AppNavbar />
        <div className="home-container">
          <SearchBar />
        </div>
        <Footer />
      </Suspense>
    </>
  );
};

export default Search;
