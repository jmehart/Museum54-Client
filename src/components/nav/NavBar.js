import React, { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"

export const NavBar = ({ token, setToken, refreshState, setRefreshState, setTokenState }) => {
  const history = useHistory()
  const navbar = useRef()
  const hamburger = useRef()
  const [user, setUser] = useState({})
  const isStaff = user.is_staff

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
  },
    [])


  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-info-light mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className="title is-4 is-family-primary has-text-weight-bold has-text-black">Museum54</h1>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token
              ?
              <>
                <div className="navbar-item">
                  <Link to="/collection" className="navbar-item has-text-weight-bold">Collection</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/artists" className="navbar-item has-text-weight-bold">Artists</Link>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                  <div className="navbar-item">
                    <Link to="/donate" className="navbar-link has-text-weight-bold">Donate</Link>
                    <div class="navbar-dropdown is-boxed">
                    <Link to="/donate/art" className="navbar-item">Add Art</Link>
                    <Link to="/donate/artist" className="navbar-item">Add Artist</Link>

                    </div>
                  </div>
                </div>
              </>
              : ""
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ?
                  <button className="button is-outlined " onClick={() => {
                    localStorage.removeItem('token')
                    setTokenState(false)
                    setRefreshState(true)
                    history.push('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
