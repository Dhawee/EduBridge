// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import authImg from "../assets/Hero 1.jpg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../components/Toast";

// const API_BASE_REGISTER = "https://www.hackathon.mydev.com.ng/api/auth/signup";
// const API_BASE_LOGIN = "https://www.hackathon.mydev.com.ng/api/auth/login";

const API_BASE_REGISTER = "https://edu-bridge-bice.vercel.app/auth";
const API_BASE_LOGIN = "https://edu-bridge-bice.vercel.app/auth";

async function apiRequest(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { ok: res.ok, data: json };
  } catch (err) {
    return { ok: false, data: { message: "Network error" } };
  }
}

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const location = useLocation();
  const { toast } = useToast();

  // Pre-fill email if navigated from verification
  const prefillEmail = location.state?.email || "";
  const verified = location.state?.verified || false;

  useEffect(() => {
    if (verified) {
      toast("Email verified! You can now log in.", { type: "success" });
    }
  }, [verified, toast]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5 animate-scaleIn mt-30 mb-20">
        <div className="p-10 text-white flex flex-col justify-center animate-slideIn">
          <div className="flex space-x-6 mb-8">
            <button
              className={`pb-2 text-lg font-semibold ${tab === "login" ? "border-b-4 border-green-400 text-green-400" : "text-gray-400"
                }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`pb-2 text-lg font-semibold ${tab === "register" ? "border-b-4 border-green-400 text-green-400" : "text-gray-400"
                }`}
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

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_BASE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        const msg =
          data?.message ||
          (data?.errors ? Object.values(data.errors).flat().join(", ") : "Login failed");
        setError(msg);
        toast(msg, { type: "error" });
        return;
      }

      // Store token EXACTLY how ProtectedRoute checks it
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast("Login successful!", { type: "success" });

      // Redirect directly to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
      toast("Network error. Please try again.", { type: "error" });
    }
  };

  return (
    <form className="space-y-6 animate-fadeIn" onSubmit={handleLogin}>
      {error && <p className="text-red-400">{error}</p>}

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        label="Password"
        show={showPassword}
        setShow={setShowPassword}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl shadow-lg transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}



/* ---------------------------- REGISTER FORM ---------------------------- */
function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullname || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const payload = { fullname: fullname.trim(), email: email.trim(), password: password.trim() };

      const res = await fetch("https://www.hackathon.mydev.com.ng/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        // Handle validation errors array or message
        const msg = data?.message || (data?.errors ? Object.values(data.errors).flat().join(", ") : "Registration failed");
        setError(msg);
        toast(msg, { type: "error" });
        return;
      }

      toast("Registration successful! Verify your email.", { type: "success" });
      navigate("/verify-email", { state: { email: email.trim() } });

    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Network error. Please try again.");
      toast("Network error. Please try again.", { type: "error" });
    }
  };

  return (
    <form className="space-y-6 animate-fadeIn" onSubmit={handleRegister}>
      {error && <p className="text-red-400">{error}</p>}
      <Input label="Full Name" value={fullname} onChange={(e) => setFullName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput label="Password" show={showPassword} setShow={setShowPassword} value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput label="Confirm Password" show={showConfirm} setShow={setShowConfirm} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      <button type="submit" disabled={loading} className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl shadow-lg transition">
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}


/* ---------------------------- Shared Inputs ---------------------------- */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input {...props} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none transition" />
    </div>
  );
}

function PasswordInput({ label, show, setShow, ...props }) {
  return (
    <div className="flex flex-col space-y-1 relative">
      <label className="text-sm text-gray-300">{label}</label>
      <input type={show ? "text" : "password"} {...props} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 outline-none pr-12" />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
        {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}
