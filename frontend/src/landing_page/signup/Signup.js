import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const dashboardUrl =
    process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

  window.location.href = dashboardUrl;
};

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5 text-center p-4">
          <img
            src="media/images/signup.png"
            alt="Signup Banner"
            style={{ width: "90%", marginBottom: "20px" }}
          />
          <h2 className="text-muted fs-3">Join 1.5+ crore investors</h2>
          <p className="text-muted fs-5 mt-2">
            Start investing in stocks, mutual funds, and options commission-free.
          </p>
        </div>
        <div className="col-md-5">
          <div className="card shadow-lg border-0 p-4" style={{ borderRadius: "12px" }}>
            <h3 className="mb-4 text-center" style={{ fontWeight: 600 }}>Create your account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted">Full Name</label>
                <input
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
                <label className="form-label text-muted">Email Address</label>
                <input
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
                <label className="form-label text-muted">Mobile Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted">+91</span>
                  <input
                    type="tel"
                    name="mobile"
                    pattern="[0-9]{10}"
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
  href={process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001"}
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
