import './navbar.css';

const Navbar = () => (
    <div className="navbar-sections">
        <button className='home-button'><div className="home"></div></button>
        <button className='saved-button'><div className="saved"></div></button>
        <button className='search-button'><div className="search"></div></button>
        <button className='profile-button'><div className="profile"></div></button>
    </div>
);

export default Navbar;