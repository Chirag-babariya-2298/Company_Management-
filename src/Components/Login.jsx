import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLoginField, loginUser } from "../Redux/Slice/LoginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyEmail, password, status, error } = useSelector((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginField({ name, value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ companyEmail, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(setLoginField({ name: 'companyEmail', value: '' }));
      dispatch(setLoginField({ name: 'password', value: '' }));
      navigate("/dashboard");
    } else {
      alert(result.payload);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-4 bg-login"
      style={{ height: "auto", minHeight: "100vh" }}
    >
      <div className="form bg-white p-3 rounded">
        <form onSubmit={handleLogin}>
          <h5 className="text-center mb-4">Login</h5>

          <div>
            <input
              className="w-100 rounded py-2 px-2 border-gray"
              type="email"
              name="companyEmail"
              value={companyEmail}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          <div>
            <input
              className="w-100 rounded mt-4 py-2 px-2 border-gray"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn py-2 mt-4 w-100 text-white login-btn">
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <div className="text-center mt-2 mb-3">
          <span>I don't have an account </span>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
