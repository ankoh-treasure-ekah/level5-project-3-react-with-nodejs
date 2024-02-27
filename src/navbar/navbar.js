import React from 'react'
import './navbar.scss';
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#006d77'}}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/">Tmanager</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className='nav-link' to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/tasks'>tasks</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link' to='/login'>login</Link>
              </li>
              <li className="nav-item">
               <Link className='nav-link' to='/signup'>signup</Link>
              </li>
            </ul>
          </div>
        </div>
        </nav>
    </React.Fragment>
  )
}

export default Navbar
