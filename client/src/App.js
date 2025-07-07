import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/homepage';
import ProfilePage from './components/profile-page';
import SearchPage from './components/search';
import SavedPage from './components/saved';
import cardData from "./data/cardData";
import savedData from "./data/savedData";

function App() {
  return (
    <div className="app-container">
      <main className="app-content">
        <Routes>
          <Route path="/"        element={<HomePage />}    />
          <Route path="/saved"        element={<SavedPage cardData={savedData} />}    />
          <Route path="/search"        element={<SearchPage cardData={cardData} />}    />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  );
}

export default App;
