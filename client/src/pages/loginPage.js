import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:2024/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUser(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Invalid credentials :( ");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <label for="username"></label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Email or Username"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        required
      />
      <label for="password"></label>
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        required
      />
      <button>Login</button>
    </form>
  );
}
