import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"


export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          setToken(res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main >
      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>
      <br></br>
      <h2 className="title has-text-centered">Welcome to Museum54</h2>
      <br></br>
      <section className="columns">
        <form className="box has-text-centered column is-half is-offset-one-quarter" onSubmit={handleLogin}>
          <fieldset className="field">
            <label className="label" htmlFor="inputUsername"> Username</label>
            <div className="control">
              <input ref={username} type="username" id="username" placeholder="Username address" required autoFocus />
            </div>
          </fieldset>
          <fieldset className="field">
            <label className="label" htmlFor="inputPassword"> Password </label>
            <div className="control">
              <input ref={password} type="password" id="password" placeholder="Password" required />
            </div>
          </fieldset>
          <fieldset className="field">
            <button className="button is-primary" type="submit">Sign In</button>
          </fieldset>
        </form>
      </section>
      <br></br>
      <section className="has-text-centered">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
