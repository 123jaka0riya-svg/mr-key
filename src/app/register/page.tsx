"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  password: string;
  key: string;
  createdAt: string;
  expires: string;
  level: number;
}

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("app_users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!username || !password || !licenseKey) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const existingUser = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      setError("Username already exists");
      setLoading(false);
      return;
    }

    const keyMatch = users.find((u) => u.key.toLowerCase() === licenseKey.toLowerCase());

    if (!keyMatch) {
      setError("Invalid license key");
      setLoading(false);
      return;
    }

    const updatedUsers = users.map((u) => {
      if (u.key.toLowerCase() === licenseKey.toLowerCase()) {
        return { ...u, username, password };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem("app_users", JSON.stringify(updatedUsers));

    localStorage.setItem("user", JSON.stringify({ 
      username, 
      name: username,
      key: licenseKey
    }));
    
    setSuccess(true);
    setTimeout(() => {
      router.push("/app");
    }, 1000);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#121218] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold">MR Key</span>
          </Link>
          <h1 className="text-3xl font-bold mt-8 mb-2">Create your account</h1>
          <p className="text-gray-400">Activate your license</p>
        </div>

        <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">License Key</label>
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="w-full px-4 py-3 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white font-mono"
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm text-center">Account created! Redirecting...</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
