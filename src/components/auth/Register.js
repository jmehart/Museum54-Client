import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "username": username.current.value,
      "password": password.current.value
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        setToken(res.token)
        history.push("/")
      }
    })
  }

  return (
    <main>
      <br></br>
      <h3 className="subtitle has-text-centered">Register an account</h3>
      <br></br>
      <section className="columns">
        <form className="box has-text-centered column is-half is-offset-one-quarter" onSubmit={handleRegister}>
          <fieldset className="field">
            <label className="label" htmlFor="inputUsername">Username</label>
            <div className="control">
              <input ref={username} type="text" name="username" placeholder="Username" required />
            </div>
          </fieldset>
          <fieldset className="field">
            <label className="label" htmlFor="inputPassword"> Password </label>
            <div className="control">
              <input ref={password} type="password" name="password" placeholder="Password" required />
            </div>
          </fieldset>
          <fieldset className="field">
            <button className="button is-primary" type="submit">Register</button>
          </fieldset>
        </form>
      </section>
      <br></br>
      <section className="has-text-centered">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>

  )
}
