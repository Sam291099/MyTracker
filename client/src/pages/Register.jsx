
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, User, Mail, Lock } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register(name.trim(), email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="dashboard-card w-100"
        style={{ maxWidth: "450px" }}
      >
        <div className="text-center mb-4">
          <UserPlus size={38} className="text-primary mb-3" />

          <h3 className="fw-bold">Create Account</h3>

          <p className="text-secondary">
            Join MyTracker and start tracking your productivity.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full name</label>

            <div className="input-group">
              <span className="input-group-text">
                <User size={17} />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={50}
                autoComplete="name"
                required
              />
            </div>
          </div>

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
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm password</label>

            <div className="input-group">
              <span className="input-group-text">
                <Lock size={17} />
              </span>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-secondary mt-4 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
