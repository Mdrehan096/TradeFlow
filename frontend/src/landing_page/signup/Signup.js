import React, { useState } from "react";
import DASHBOARD_URL from "../../config";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    window.location.href = DASHBOARD_URL;
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      <div className="row justify-content-center align-items-center g-4">
        <div className="col-12 col-md-6 col-lg-5 text-center p-2 p-md-4">
          <img
            src="/media/images/signup.png"
            alt="Signup Banner"
            className="img-fluid mb-3"
            style={{ width: "90%", maxWidth: "420px" }}
          />
          <h2 className="text-muted fs-3">Join 1.5+ crore investors</h2>
          <p className="text-muted fs-5 mt-2">
            Start investing in stocks, mutual funds, and options commission-free.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 p-3 p-sm-4" style={{ borderRadius: "12px" }}>
            <h3 className="mb-4 text-center" style={{ fontWeight: 600 }}>Create your account</h3>
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="signup-name" className="form-label text-muted">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-email" className="form-label text-muted">Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signup-mobile" className="form-label text-muted">Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">+91</span>
                  <input
                    id="signup-mobile"
                    type="tel"
                    name="mobile"
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    maxLength={10}
                    className="form-control border-start-0"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 fs-5 mt-3 py-2"
                style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
              >
                Sign up & Launch Terminal
              </button>
            </form>
            <div className="text-center mt-3">
              <span className="text-muted fs-6">
                Already have an account?

                <a
                  href={DASHBOARD_URL}
                  style={{ textDecoration: "none" }}
                >
                  Log in here
                </a>

              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
