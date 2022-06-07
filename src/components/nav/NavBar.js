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
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/* <img src={Logo} height="3rem" /> <h1 className="title is-4">Rare Publishing</h1> */}
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
                <Link to="/artists" className="navbar-item">All Artists</Link>
                {
                  isStaff ?
                    <div className="navbar-item">
                      <Link to="/users" className="navbar-item">Users</Link>
                    </div>
                    : ""
                }
                <div className="navbar-item">
                  <Link to="/donate/artist" className="navbar-item">Add Artist</Link>
                </div>
                {/* add link to UserList view */}
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
                  <button className="button is-outlined" onClick={() => {
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
