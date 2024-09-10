import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import logo from "../images/logo.png";
import login_navbar from "../images/login_navbar.png";
import "./Navbar.css";
import { fetchMovieGenre } from "../../api/api_index";
import { Link } from "react-router-dom";
import LoginModal from "../Login/Login";

interface Genre {
  id: number;
  name: string;
}

const Navbar: React.FC = () => {
  const [moviesGenre, setMoviesGenre] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.user.userId);
  const username = useSelector((state: RootState) => state.user.username);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!isLoginDropdownOpen);
  };

  const toggleGenreDropdown = () => {
    setGenreDropdownOpen(!isGenreDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieGenre();
        const dataGenres = await response.json();
        setMoviesGenre(dataGenres.genres);
      } catch (error) {
        setError("Error fetching movie genres");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="navbar_container">
      <nav>
        <img src={logo} alt="Logo" className="logo_navbar" />
        <ul className="main_menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Movies</a>
          </li>
          <li>
            <a href="#">TV Shows</a>
          </li>
          <li className="genre_container" onClick={toggleGenreDropdown}>
            <a href="#">Genre</a>
            {isGenreDropdownOpen && (
              <ul className="dropdown_menu">
                {loading ? (
                  <li>Loading...</li>
                ) : error ? (
                  <li>{error}</li>
                ) : (
                  moviesGenre.map((genre) => (
                    <li key={genre.id}>
                      <a href="#">{genre.name}</a>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>

        <div className="login_container" onClick={toggleLoginDropdown}>
          <img src={login_navbar} alt="Login" className="login_navbar" />
          {isLoginDropdownOpen && (
            <ul className="login_dropdown_menu">
              {userId ? (
                <>
                  <li>
                    <span>{username}</span>
                  </li>
                  <li>
                    <Link to="/my-favorites">My Favorites</Link>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={openLoginModal}>Login</button>
                </li>
              )}
            </ul>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Navbar;
