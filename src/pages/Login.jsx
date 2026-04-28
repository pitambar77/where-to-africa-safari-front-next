"use client"

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Step 1: Verify username + password & send OTP
  const sendOTP = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(
        "http://where-to-africa-safari-backend.manoramaseoservice.com/api/auth/send-otp",
        { username, password },
      );

      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 2: Verify OTP
  const verifyOTP = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://where-to-africa-safari-backend.manoramaseoservice.com/api/auth/verify-otp",
        { username, otp },
      );

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full border p-3 mb-4 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border p-3 mb-4 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-3 mb-4 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
