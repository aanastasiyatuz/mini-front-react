import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar bg-light d-flex justify-content-center" style={{ 'width': '100%' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ 'width': '95%' }}>
                <div className="d-flex justify-content-between" style={{'width':'15%'}}>
                    <Link to={'/shop'} style={{'textDecoration':'none','color':'black'}}><button className='btn btn-outline-success'>Home</button></Link>
                    <Link to={'/new'} style={{'textDecoration':'none','color':'black'}}><button className='btn btn-outline-success'>Create</button></Link>
                </div>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
};

export default Header;