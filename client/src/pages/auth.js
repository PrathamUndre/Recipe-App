
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5" >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="d-flex justify-content-around mb-3">
          <button className={`btn ${isLogin ? "btn-primary" : "btn-secondary"}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`btn ${!isLogin ? "btn-success" : "btn-secondary"}`} onClick={() => setIsLogin(false)}>Register</button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("https://recipe-app-dra0.onrender.com/auth/login", { username, password });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipe-app-dra0.onrender.com/auth/register", { username, password });
      alert("Registration Completed! Now login.");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-success w-100">Register</button>
         
      </form>
    </div>
  );
};
// import React, { useState } from "react";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

// export const Auth = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f7f7f7" }}>
//       <div className="card shadow-lg p-4" style={{ width: "400px" }}>
//         <Login />
//         <Register />
//       </div>
//     </div>
//   );
// };

// const Login = () => {
//   const [_, setCookies] = useCookies(["access_token"]);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const result = await axios.post("https://recipe-app-dra0.onrender.com/auth/login", {
//         username,
//         password,
//       });

//       setCookies("access_token", result.data.token);
//       window.localStorage.setItem("userID", result.data.userID);
//       navigate("/");
//     } catch (error) {
//       setError("Invalid username or password. Please try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="auth-container mb-4">
//       <h2 className="text-center mb-3">Login</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100 mt-3">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [_, setCookies] = useCookies(["access_token"]);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.post("https://recipe-app-dra0.onrender.com/auth/register", {
//         username,
//         password,
//       });
//       alert("Registration Completed! Now login.");
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2 className="text-center mb-3">Register</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success w-100 mt-3">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };
