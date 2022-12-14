import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import "./login.scss";
import backgroundlogin from "../../assets/img/backgroundlogin.svg";
import logologin from "../../assets/img/logologin.svg";
import AuthContext from "../../context/AuthProvider";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

const LOGIN_URL = "/auth/signin";

const Login = () => {
  const [state, dispatch] = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [register, setRegister] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = form;
  const handleRegister = () => setRegister(!register);
  const handleShow = () => {
    setShowPass(!showPass);
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrMsg("Masukan Email dan Password anda");
    } else {
      try {
        const body = {
          email: email,
          password: password,
        };

        const response = await API.post(LOGIN_URL, body);
        const accessToken = response?.data?.data?.access_token;
        const data = {
          user: body,
          token: accessToken,
        };
        dispatch({
          type: "LOGIN SUCCESS",
          payload: data,
        });
        console.log(state);
        navigate("/");
      } catch (error) {
        setErrMsg("Username atau password tidak sesuai");
        console.log(error);
      }
    }
  };

  return (
    <section className="loginSection">
      <div className="row">
        <div className="left">
          <img src={logologin} alt="logologin" onClick={() => navigate("/")} />
          {register ? (
            <>
              <h1>Register</h1>
              <form onSubmit={handleSubmitLogin}>
                <div className="input">
                  <p>
                    <GrIcons.GrUser />
                  </p>
                  <input type="text" placeholder="masukan username anda" />
                </div>
                <div className="input">
                  <p>
                    <MdIcons.MdEmail />
                  </p>
                  <input type="text" placeholder="masukan email anda" />
                </div>
                <div className="input">
                  <p>
                    <MdIcons.MdLock />
                  </p>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="masukan password anda"
                  />
                  <p onClick={handleShow}>
                    {showPass ? (
                      <GrIcons.GrFormViewHide />
                    ) : (
                      <GrIcons.GrFormView />
                    )}
                  </p>
                </div>
                <div className="input">
                  <p>
                    <GrIcons.GrPhone />
                  </p>
                  <input type="text" placeholder="masukan No.Hp anda" />
                </div>
                <button>Daftar</button>
              </form>
            </>
          ) : (
            <>
              <h1>Login</h1>
              <form onSubmit={handleSubmitLogin}>
                <div className="input">
                  <p>
                    <MdIcons.MdEmail />
                  </p>
                  <input
                    type="text"
                    placeholder="masukan email anda"
                    value={email}
                    name="email"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="input">
                  <p>
                    <MdIcons.MdLock />
                  </p>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="masukan password anda"
                    value={password}
                    name="password"
                    onChange={handleOnChange}
                  />
                  <p onClick={handleShow}>
                    {showPass ? (
                      <GrIcons.GrFormViewHide />
                    ) : (
                      <GrIcons.GrFormView />
                    )}
                  </p>
                </div>
                <p className="error">{errMsg}</p>
                <button>Masuk</button>
              </form>
            </>
          )}

          <button onClick={handleRegister} className="registerButton">
            {register ? "Masuk" : "Daftar"}
          </button>
        </div>
        <div className="right">
          <img src={backgroundlogin} alt="backgroundlogin" />
        </div>
      </div>
    </section>
  );
};

export default Login;
