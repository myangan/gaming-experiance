import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function User() {
  const { user, setUser, login, users } = useContext(UserContext);
  const [input, setInput] = useState("");
  const [err, setErr] = useState();
  const [logged, setLogged] = useState(true);

  function handleSubmit(e) {
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
        <form action="/">
          <label for="user">Users</label>
          <select id="user" name="username">
            {users.map((x) => (
              <option value={x.username} key={x.username}>
                {x.username}
              </option>
            ))}
          </select>
        </form>

        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          sign in
        </button>
        {err ? <p>user does not exist </p> : <p></p>}
        <Link to="/users/signup" className="signUp">
          Sign-up
        </Link>
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
