// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import authImg from "../assets/Hero 1.jpg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../components/Toast";

// Use the Vercel URL as the single source of truth
const API_BASE_URL = "edu-bridge-bice.vercel.app";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const location = useLocation();
  const { toast } = useToast();

  const prefillEmail = location.state?.email || "";
  const verified = location.state?.verified || false;

  useEffect(() => {
    if (verified) {
      toast("Email verified! You can now log in.", { type: "success" });
    }
  }, [verified, toast]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5 mt-30 mb-20">
        <div className="p-10 text-white flex flex-col justify-center">
          <div className="flex space-x-6 mb-8">
            <button
              className={`pb-2 text-lg font-semibold ${tab === "login" ? "border-b-4 border-green-400 text-green-400" : "text-gray-400"}`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`pb-2 text-lg font-semibold ${tab === "register" ? "border-b-4 border-green-400 text-green-400" : "text-gray-400"}`}
              onClick={() => setTab("register")}
            >
              Register
            </button>
          </div>

          {tab === "login" ? <LoginForm defaultEmail={prefillEmail} /> : <RegisterForm />}
        </div>

        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-green-400/20 to-black/30 relative overflow-hidden">
          <img src={authImg} alt="auth" className="max-w-full max-h-full object-contain opacity-90" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- LOGIN FORM ---------------------------- */
function LoginForm({ defaultEmail }) {
  const [email, setEmail] = useState(defaultEmail || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Correctly append /login to the Vercel base URL
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        const msg = data?.message || "Login failed";
        setError(msg);
        toast(msg, { type: "error" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast("Login successful!", { type: "success" });
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
      toast("Network error. Please try again.", { type: "error" });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      {error && <p className="text-red-400">{error}</p>}
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput label="Password" show={showPassword} setShow={setShowPassword} value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl shadow-lg transition">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

/* ---------------------------- REGISTER FORM ---------------------------- */
function RegisterForm() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Correctly append /signup to the Vercel base URL
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname: fullname.trim(), email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        const msg = data?.message || "Registration failed";
        setError(msg);
        toast(msg, { type: "error" });
        return;
      }

      toast("Registration successful! Verify your email.", { type: "success" });
      navigate("/verify-email", { state: { email: email.trim() } });

    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
      toast("Network error. Please try again.", { type: "error" });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleRegister}>
      {error && <p className="text-red-400">{error}</p>}
      <Input label="Full Name" value={fullname} onChange={(e) => setFullName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput label="Password" show={showPassword} setShow={setShowPassword} value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput label="Confirm Password" show={showPassword} setShow={setShowPassword} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl shadow-lg transition">
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

/* ---------------------------- UI HELPER COMPONENTS ---------------------------- */

function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        type={type}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-all"
        required
      />
    </div>
  );
}

function PasswordInput({ label, show, setShow, ...props }) {
  return (
    <div className="flex flex-col space-y-1 relative">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-green-400 focus:outline-none transition-all"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
