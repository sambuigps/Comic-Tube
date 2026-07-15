  import { LoaderCircle, Lock, Mail } from "lucide-react";
  import { useState } from "react";
  import type { ChangeEvent, SyntheticEvent } from "react";
  import { Link } from "react-router-dom";
  import { GoogleLogin, type CredentialResponse} from "@react-oauth/google";
  import axios from "axios";

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log("Step 1");
    console.log(credentialResponse);

    console.log("Step 2 - Before axios");

    try {
        const response = await axios.post(
            "http://localhost:8000/api/auth/google",
            {
                idToken: credentialResponse.credential,
            },
            {
                withCredentials: true,
            }
        );

        console.log("Step 3 - Response");
        console.log(response.data);

    } catch (error) {
        console.log("Step 4 - Error");
        console.log(error);
    }
};

  function LoginPage() {
    const [user, setUser] = useState({
      email: "",
      password: "",
    });

    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors = {
        email: "",
        password: "",
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!user.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!emailRegex.test(user.email)) {
        newErrors.email = "Please enter a valid email.";
      }

      if (!user.password.trim()) {
        newErrors.password = "Password is required.";
      }

      if (newErrors.email || newErrors.password) {
        setErrors(newErrors);
        return;
      }

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        alert("Login successful!");
      }, 1500);
    };

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
          <h2 className="mb-2 text-center text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mb-8 text-center text-sm text-zinc-400">
            Sign in to Comic-Tube
          </p>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google Login Failed")}
            />
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>

            <span className="flex-shrink mx-2 text-sm font-medium text-gray-500 text-xl">
              or
            </span>

            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-2 block text-sm text-zinc-300">Email</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none ${
                    errors.email
                      ? "border-red-500"
                      : "border-zinc-700 focus:border-blue-500"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm text-zinc-300">Password</label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-zinc-800 py-3 pl-10 pr-4 text-white outline-none ${
                    errors.password
                      ? "border-red-500"
                      : "border-zinc-700 focus:border-blue-500"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <br></br>
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  export default LoginPage;
