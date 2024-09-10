import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import LoginModal from '../components/Login/Login';
import SearchResults from '../components/SearchResults/SearchResults';
import FavoriteList from '../components/FavoriteList/FavoriteList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginModal isOpen={true} onClose={function (): void {
          throw new Error('Function not implemented.');
        } }/>} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path= "/my-favorites" element = {<FavoriteList/>}/>
       <Route path='/tvshows'/>
      </Routes>
    </Router>
  );
};

export default App;
