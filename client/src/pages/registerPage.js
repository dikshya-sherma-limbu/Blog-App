import { useState } from "react";

export default function RegisterPage() {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2024/register", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          middlename,
          lastname,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      //if password does not meet credentials

      if (response.status === 200) {
        alert("User created successfully");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
      alert("Registration Failed !");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <label for="firstname">First name</label>
      <input
        type="text"
        placeholder="First name"
        required
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <label for="middlename">Middle name</label>
      <input
        type="text"
        placeholder="Middle name"
        value={middlename}
        onChange={(e) => setMiddlename(e.target.value)}
      />
      <label for="lastname">Last name</label>
      <input
        type="text"
        placeholder="Last name"
        required
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <label for="email">Email</label>
      <input
        type="text"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label for="password">Password</label>
      <input
        type="text"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
