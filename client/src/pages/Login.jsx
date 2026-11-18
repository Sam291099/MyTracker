
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="dashboard-card w-100"
        style={{ maxWidth: "430px" }}
      >
        <div className="text-center mb-4">
          <div className="mb-3">
            <LogIn size={38} className="text-primary" />
          </div>

          <h3 className="fw-bold">Welcome Back</h3>

          <p className="text-secondary">
            Log in to continue to MyTracker.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>

            <div className="input-group">
              <span className="input-group-text">
                <Mail size={17} />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="input-group">
              <span className="input-group-text">
                <Lock size={17} />
              </span>

              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-secondary mt-4 mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
