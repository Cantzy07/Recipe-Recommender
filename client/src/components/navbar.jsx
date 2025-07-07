// Navbar.jsx
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
        <div className="navbar-sections">
            <button
                className="home-button"
                onClick={() => navigate('/')}
            >
                <div className="home" />
            </button>

            <button
                className="saved-button"
                onClick={() => navigate('/saved')}
            >
                <div className="saved" />
            </button>

            <button
                className="search-button"
                onClick={() => navigate('/search')}
            >
                <div className="search" />
            </button>

            <button
                className="profile-button"
                onClick={() => navigate('/profile')}
            >
                <div className="profile" />
            </button>
        </div>
    </div>
  );
};

export default Navbar;