import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

export default function Header() {
  const { setUser, user } = useContext(UserContext);
  // const [email, setEmail] = useState(null); // Initialize state for storing the username
  // useEffect with an empty dependency array runs only once when the component mounts
  useEffect(() => {
    fetch("http://localhost:2024/profile", {
      credentials: "include", // Include credentials like cookies in the request
    }).then((response) => {
      response
        .json() //Convert the response to JSON
        .then((userInfo) => {
          setUser(userInfo); // Update the user context with the fetched user data
        });
    });
  }, []);
  function logout() {
    fetch("http://localhost:2024/logout", {
      credentials: "include",
      method: "POST",
    });
    setUser(null);
  }

  const email = user?.email;
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {email && (
          <>
            <Link to="/create">Create Post</Link>
            <a onClick={logout}> Log out</a>
          </>
        )}
        {!email && (
          <>
            <Link to="/login" className="signup">
              Login
            </Link>
            <Link to="/register" className="signup">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
