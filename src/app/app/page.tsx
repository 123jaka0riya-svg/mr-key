"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  email: string;
  key: string;
  createdAt: string;
  expires: string;
  level: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "", expires: "never" });
  const [appName, setAppName] = useState("My Application");
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
      const storedUsers = localStorage.getItem("app_users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    }
  }, [router]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const key = generateKey();
    const newUserData: User = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      key: key,
      createdAt: new Date().toISOString().split("T")[0],
      expires: newUser.expires === "never" ? "Never" : newUser.expires,
      level: 1,
    };

    const updatedUsers = [...users, newUserData];
    setUsers(updatedUsers);
    localStorage.setItem("app_users", JSON.stringify(updatedUsers));

    setNewUser({ username: "", email: "", expires: "never" });
    setShowAddUser(false);
    setLoading(false);
  };

  const generateKey = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let key = "";
    for (let i = 0; i < 24; i++) {
      if (i > 0 && i % 4 === 0) key += "-";
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const deleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("app_users", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#121218]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#1a1a22] border-r border-[#2a2a3a] p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-xl font-bold">KeyAuth</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "overview" ? "bg-indigo-500" : "hover:bg-[#2a2a3a]"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "users" ? "bg-indigo-500" : "hover:bg-[#2a2a3a]"}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("keys")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "keys" ? "bg-indigo-500" : "hover:bg-[#2a2a3a]"}`}
          >
            Keys
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "settings" ? "bg-indigo-500" : "hover:bg-[#2a2a3a]"}`}
          >
            Settings
          </button>
        </nav>

        <div className="border-t border-[#2a2a3a] pt-4">
          <div className="px-4 py-2 text-sm text-gray-400">
            Logged in as <span className="text-white">{user.name}</span>
          </div>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{appName}</h1>
            <p className="text-gray-400">Application Dashboard</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition"
          >
            + Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-4">
            <div className="text-gray-400 text-sm">Total Users</div>
            <div className="text-2xl font-bold text-white">{users.length}</div>
          </div>
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-4">
            <div className="text-gray-400 text-sm">Active Keys</div>
            <div className="text-2xl font-bold text-white">{users.length}</div>
          </div>
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-4">
            <div className="text-gray-400 text-sm">Banned</div>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-4">
            <div className="text-gray-400 text-sm">Online</div>
            <div className="text-2xl font-bold text-green-400">0</div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#2a2a3a]">
            <h2 className="text-xl font-semibold text-white">User Management</h2>
          </div>
          <table className="w-full">
            <thead className="bg-[#18181f]">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Username</th>
                <th className="text-left p-4 text-gray-400 font-medium">Email</th>
                <th className="text-left p-4 text-gray-400 font-medium">Key</th>
                <th className="text-left p-4 text-gray-400 font-medium">Created</th>
                <th className="text-left p-4 text-gray-400 font-medium">Expires</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No users yet. Click &quot;Add User&quot; to create one.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-[#2a2a3a] hover:bg-[#222230]">
                    <td className="p-4 text-white">{u.username}</td>
                    <td className="p-4 text-gray-400">{u.email}</td>
                    <td className="p-4 font-mono text-sm text-cyan-400">{u.key}</td>
                    <td className="p-4 text-gray-400">{u.createdAt}</td>
                    <td className="p-4">
                      <span className={u.expires === "Never" ? "text-green-400" : "text-gray-400"}>
                        {u.expires}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Create New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Expires</label>
                <select
                  value={newUser.expires}
                  onChange={(e) => setNewUser({ ...newUser, expires: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                >
                  <option value="never">Never</option>
                  <option value="1day">1 Day</option>
                  <option value="7days">7 Days</option>
                  <option value="30days">30 Days</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 py-2 bg-[#2a2a3a] hover:bg-[#3a3a4a] rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}