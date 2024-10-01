import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthProvider';

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state before registration attempt

        // Call register function with username, email, and password
        const errorMessage = await signup(username, email, password);
        if (errorMessage) {
            setError(errorMessage);
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <div className="container-fluid h-100 bg-white d-flex">
            <div className="row flex-fill">
                <div className="col-lg-8 d-none d-lg-block p-0">
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-100 h-100 object-cover"
                    >
                        <source src="/video/video4.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="col-lg-4 col-12 d-flex align-items-center p-4">
                    <div className="w-100">
                        <h2 className="text-center text-warning font-weight-bold mb-4">
                            TRIP MANAGEMENT
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control bg-light border border-secondary"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control bg-light border border-secondary"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group position-relative">
                                <input
                                    className="form-control bg-light border border-secondary"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {error && (
                                    <p className="text-danger text-center mt-2">{error}</p>
                                )}
                                <svg
                                    onClick={() => setShowPassword(!showPassword)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="gray"
                                    className="position-absolute"
                                    style={{ top: "50%", right: "10px", cursor: "pointer" }}
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>

                            <button className="btn btn-warning w-100 mb-3">
                                Sign Up
                            </button>
                        </form>

                        <div className="text-center text-muted my-3">OR</div>

                        <button className="btn btn-light w-100 border mb-4 d-flex align-items-center justify-content-center">
                            <svg
                                className="mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="25px"
                            >
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Sign Up with Google
                        </button>

                        <div className="text-center">
                            <a href="#" className="text-muted text-decoration-none">
                                Forgot your password?
                            </a>
                        </div>

                        <div className="d-flex justify-content-between mt-3 text-muted">
                            <p>Already have an account?</p>
                            <Link to="/sign-in">
                                <button className="btn btn-warning px-4">Sign in</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
