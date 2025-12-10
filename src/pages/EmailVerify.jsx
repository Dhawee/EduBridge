// // src/pages/EmailVerify.jsx
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useCountdown from "../hooks/useCountdown";
// import { useToast } from "../components/Toast";

// const API_BASE = "https://www.hackathon.mydev.com.ng/api/auth";
// const COUNTDOWN_SECONDS = 60;

// export default function EmailVerify() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const email = state?.email || "";
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);
//   const [error, setError] = useState("");

//   const { seconds, running, start, reset } = useCountdown(COUNTDOWN_SECONDS);

//   useEffect(() => {
//     if (!email) {
//       toast("No email found. Please register first.", { type: "error" });
//       navigate("/auth");
//       return;
//     }
//     start();
//   }, [email]);

//   // ---------------------------------------------------
//   // VERIFY OTP
//   // ---------------------------------------------------
//   const verifyOTP = async (e) => {
//     e.preventDefault();

//     if (!otp || otp.length < 6) {
//       setError("Please enter the 6-digit code.");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE}/verify`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const text = await res.text();
//       let data;

//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: "Invalid response from server" };
//       }

//       if (!res.ok) {
//         const msg = data?.message || "Invalid code";
//         setError(msg);
//         toast(msg, { type: "error" });
//         return;
//       }

//       toast("Email Verified Successfully", { type: "success" });

//       navigate("/auth", {
//         state: { verified: true, email },
//       });

//     } catch (err) {
//       const msg = err.message || "Network error";
//       setError(msg);
//       toast(msg, { type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------
//   // RESEND OTP
//   // ---------------------------------------------------
//   const resendOTP = async () => {
//     if (running) return;
//     setResending(true);
//     setError("");

//     try {
//       const res = await fetch(`${API_BASE}/resend-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const text = await res.text();
//       let data;

//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: "Server returned invalid response" };
//       }

//       if (!res.ok) {
//         const msg = data?.message || "Could not resend code";
//         setError(msg);
//         toast(msg, { type: "error" });
//         return;
//       }

//       toast("Verification code resent", { type: "success" });

//       reset();
//       start();

//     } catch (err) {
//       const msg = err.message || "Network error";
//       setError(msg);
//       toast(msg, { type: "error" });
//     } finally {
//       setResending(false);
//     }
//   };

//   const formatTime = (s) => {
//     const mm = Math.floor(s / 60).toString().padStart(2, "0");
//     const ss = (s % 60).toString().padStart(2, "0");
//     return `${mm}:${ss}`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
//       <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md max-w-md w-full animate-scaleIn">
//         <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
//         <p className="text-gray-300 mb-4">
//           Enter the verification code sent to{" "}
//           <span className="font-medium text-green-300">{email}</span>
//         </p>

//         {error && <div className="mb-3 text-red-400">{error}</div>}

//         <form onSubmit={verifyOTP} className="space-y-4">
//           <input
//             value={otp}
//             onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//             maxLength={6}
//             className="w-full text-center text-lg tracking-widest px-4 py-3 bg-white/6 border border-white/10 rounded-xl outline-none"
//             placeholder="Enter code"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition"
//           >
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//         </form>

//         <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
//           <div>
//             {running ? (
//               <span>
//                 Resend available in{" "}
//                 <strong className="text-white ml-1">{formatTime(seconds)}</strong>
//               </span>
//             ) : (
//               <span className="text-green-300">You can resend the code now</span>
//             )}
//           </div>

//           <button
//             onClick={resendOTP}
//             disabled={running || resending}
//             className={`text-sm font-medium px-3 py-1 rounded-lg transition ${
//               running ? "opacity-50 cursor-not-allowed" : "bg-white/6 hover:bg-white/10"
//             }`}
//           >
//             {resending ? "Resending..." : "Resend Code"}
//           </button>
//         </div>

//         <div className="mt-6 text-center text-sm text-gray-400">
//           <button onClick={() => navigate("/auth")} className="underline hover:text-white">
//             Back to login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/EmailVerify.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCountdown from "../hooks/useCountdown";
import { useToast } from "../components/Toast";

const API_BASE = "https://www.hackathon.mydev.com.ng/api/auth";
const COUNTDOWN_SECONDS = 60;

export default function EmailVerify() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const email = state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  const { seconds, running, start, reset } = useCountdown(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!email) {
      toast("No email found. Please register first.", { type: "error" });
      navigate("/auth");
      return;
    }
    start();
  }, [email, navigate, toast, start]);

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      setError("Please enter the 4-digit code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: "Invalid response from server" };
      }

      if (!res.ok) {
        const msg = data?.message || "Invalid code";
        setError(msg);
        toast(msg, { type: "error" });
        return;
      }

      toast("Email Verified Successfully", { type: "success" });

      navigate("/auth", {
        state: { verified: true, email },
      });

    } catch (err) {
      const msg = err.message || "Network error";
      setError(msg);
      toast(msg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (running) return;

    setResending(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: "Invalid response from server" };
      }

      if (!res.ok) {
        const msg = data?.message || "Unable to resend code";
        setError(msg);
        toast(msg, { type: "error" });
        return;
      }

      toast("Verification code resent", { type: "success" });
      reset();
      start();

    } catch (err) {
      const msg = err.message || "Network error";
      setError(msg);
      toast(msg, { type: "error" });
    } finally {
      setResending(false);
    }
  };

  const formatTime = (s) => {
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md max-w-md w-full animate-scaleIn">
        <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
        <p className="text-gray-300 mb-4">
          Enter the verification code sent to{" "}
          <span className="font-medium text-green-300">{email}</span>
        </p>

        {error && <div className="mb-3 text-red-400">{error}</div>}

        <form onSubmit={verifyOTP} className="space-y-4">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            className="w-full text-center text-lg tracking-widest px-4 py-3 bg-white/6 border border-white/10 rounded-xl outline-none"
            placeholder="Enter code"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
          <div>
            {running ? (
              <span>
                Resend available in{" "}
                <strong className="text-white ml-1">{formatTime(seconds)}</strong>
              </span>
            ) : (
              <span className="text-green-300">You can resend the code now</span>
            )}
          </div>

          <button
            onClick={resendOTP}
            disabled={running || resending}
            className={`text-sm font-medium px-3 py-1 rounded-lg transition ${
              running ? "opacity-50 cursor-not-allowed" : "bg-white/6 hover:bg-white/10"
            }`}
          >
            {resending ? "Resending..." : "Resend Code"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <button
            onClick={() => navigate("/auth")}
            className="underline hover:text-white"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
