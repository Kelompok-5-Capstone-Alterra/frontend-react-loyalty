import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API } from "../../auth";
import "./login.scss";

const LOGIN_URL = "/auth/signin";

const Login = () => {
  const { setAuth } = useAuth();

  //   console.log(useAuth());

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        email: user,
        password: pwd,
      };

      console.log(body);
      const response = await API.post(LOGIN_URL, body);
      const accessToken = response?.data?.data?.access_token;
      localStorage.setItem("Bearer", accessToken);
      console.log(accessToken);
      const roles = 5150;
      setAuth({ user, pwd, roles, accessToken });
      navigate("/beranda");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="loginSection">
      <div className="row">
        <div className="left">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <div className="input">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <label>Password</label>
            <div className="input">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
        <div className="right">
          <img
            src="https://images.unsplash.com/photo-1620807773206-49c1f2957417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="coffe"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
