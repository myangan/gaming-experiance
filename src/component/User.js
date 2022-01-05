import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function User() {
  const { user, setUser, login, users } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [err, setErr] = useState();
  const [logged, setLogged] = useState(true);

  function handleSignIn(e) {
    setErr("");
    setLogged(true);
    e.preventDefault();
    login(input).catch((err) => setErr(err));
  }
  function handleSignOut(e) {
    setUser({});
    e.preventDefault();
    setErr("");
    setLogged(false);
  }
  if (!logged || err || !Object.keys(setUser) || !user.name) {
    return (
      <div className="User">
        <form action="/" className="Form">
          <label className="usernameLabel" for="username">
            <input
              className="usernameInput"
              list="users-choice"
              name="username"
              id="username"
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <datalist id="users-choice">
            {users.map((user) => (
              <option value={user.username} key={user.username}>
                {user.username}
              </option>
            ))}
          </datalist>
          <button
            className="SignIn"
            onClick={(event) => {
              handleSignIn(event);
            }}
          >
            sign in
          </button>
        </form>
        {err ? <p>user does not exist </p> : <p></p>}
        <button className="signUp">
          <Link to="/users/signup" className="signUp">
            Sign Up
          </Link>
        </button>
      </div>
    );
  } else {
    return (
      <div className="User">
        <img
          src={`${user.avatar_url}`}
          alt="userAvatar"
          className="UserAvatar"
        />
        <p className="Name">
          {user.name} {user.username}
        </p>
        <button
          className="SignOut"
          onClick={(event) => {
            handleSignOut(event);
          }}
        >
          sign-out
        </button>
      </div>
    );
  }
}
