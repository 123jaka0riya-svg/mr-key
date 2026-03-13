"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DownloadCard } from "@/components/DownloadCard";

interface User {
  id: string;
  username: string;
  password: string;
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
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ expires: "never", customDate: "" });
  const [editUser, setEditUser] = useState({ username: "", password: "", expires: "never", customDate: "" });
  const [appName, setAppName] = useState("MR Key");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    let expireDate = newUser.expires === "never" ? "Never" : newUser.expires;
    
    if (newUser.expires === "custom" && newUser.customDate) {
      expireDate = newUser.customDate;
    } else if (newUser.expires === "1day") {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      expireDate = date.toISOString().split("T")[0];
    } else if (newUser.expires === "7days") {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      expireDate = date.toISOString().split("T")[0];
    } else if (newUser.expires === "30days") {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      expireDate = date.toISOString().split("T")[0];
    } else if (newUser.expires === "1year") {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      expireDate = date.toISOString().split("T")[0];
    }

    const newUserData: User = {
      id: Date.now().toString(),
      username: "Not Registered",
      password: "Not Registered",
      key: key,
      createdAt: new Date().toISOString().split("T")[0],
      expires: expireDate,
      level: 1,
    };

    const updatedUsers = [...users, newUserData];
    setUsers(updatedUsers);
    localStorage.setItem("app_users", JSON.stringify(updatedUsers));

    setNewUser({ expires: "never", customDate: "" });
    setShowAddUser(false);
    setLoading(false);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);

    let expireDate = editUser.expires === "never" ? "Never" : editUser.expires;
    
    if (editUser.expires === "custom" && editUser.customDate) {
      expireDate = editUser.customDate;
    } else if (editUser.expires === "1day") {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      expireDate = date.toISOString().split("T")[0];
    } else if (editUser.expires === "7days") {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      expireDate = date.toISOString().split("T")[0];
    } else if (editUser.expires === "30days") {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      expireDate = date.toISOString().split("T")[0];
    } else if (editUser.expires === "1year") {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      expireDate = date.toISOString().split("T")[0];
    }

    const updatedUsers = users.map((u) => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          username: editUser.username,
          password: editUser.password,
          expires: expireDate,
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem("app_users", JSON.stringify(updatedUsers));

    setShowEditUser(false);
    setEditingUser(null);
    setEditUser({ username: "", password: "", expires: "never", customDate: "" });
    setLoading(false);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditUser({
      username: user.username,
      password: user.password,
      expires: "custom",
      customDate: user.expires === "Never" ? "" : user.expires,
    });
    setShowEditUser(true);
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
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold">{appName}</span>
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
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "settings" ? "bg-indigo-500" : "hover:bg-[#2a2a3a]"}`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab("downloads")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "downloads" ? "bg-indigo-500" : "hover:bg-[#2a2a3a]"}`}
          >
            Downloads
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
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">{appName}</h1>
                <p className="text-gray-400">Application Dashboard</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Total Users</div>
                <div className="text-2xl font-bold text-white">{users.length}</div>
              </div>
              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-4">
                <div className="text-gray-400 text-sm">Active Users</div>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Licenses</span>
                    <span className="text-white">{users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active</span>
                    <span className="text-green-400">{users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expired</span>
                    <span className="text-red-400">0</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3 text-gray-400">
                  <p>No recent activity</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Users</h1>
                <p className="text-gray-400">Manage your users</p>
              </div>
              <button
                onClick={() => setShowAddUser(true)}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition"
              >
                + Add User
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users by username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a22] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
              />
            </div>

            <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#18181f]">
                  <tr>
                    <th className="text-left p-4 text-gray-400 font-medium">License Key</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Username</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Created</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Expires</th>
                    <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400">
                        {searchQuery ? "No users found matching your search." : "No users yet. Add one to get started."}
                      </td>
                    </tr>
                  ) : (
                    users.filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                      <tr key={u.id} className="border-t border-[#2a2a3a] hover:bg-[#222230]">
                        <td className="p-4 font-mono text-sm text-cyan-400">{u.key}</td>
                        <td className="p-4 text-white">{u.username}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
                        </td>
                        <td className="p-4 text-gray-400">{u.createdAt}</td>
                        <td className="p-4">
                          <span className={u.expires === "Never" ? "text-green-400" : "text-gray-400"}>
                            {u.expires}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => openEditModal(u)}
                              className="text-indigo-400 hover:text-indigo-300 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="text-red-400 hover:text-red-300 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-gray-400">Configure your application</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Application Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Application Name</label>
                    <input
                      type="text"
                      value="MR Key"
                      readOnly
                      className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg text-gray-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">Application name cannot be changed</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">HWID Lock</div>
                      <div className="text-gray-400 text-sm">Bind license to hardware ID</div>
                    </div>
                    <button className="w-12 h-6 bg-indigo-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Two-Factor Auth</div>
                      <div className="text-gray-400 text-sm">Require 2FA for all users</div>
                    </div>
                    <button className="w-12 h-6 bg-[#2a2a3a] rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">API Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <input
                      type="text"
                      value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg text-gray-400 font-mono"
                    />
                  </div>
                  </div>
                </div>
              </div>
            </>
        )}

        {/* Downloads Tab */}
        {activeTab === "downloads" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Downloads</h1>
              <p className="text-gray-400">Download authentication code for your software</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DownloadCard 
                title="C# (.NET)"
                language="csharp"
                icon="C#"
                description="For C# applications"
                appName={appName}
              />
              <DownloadCard 
                title="Python"
                language="python"
                icon="🐍"
                description="For Python applications"
                appName={appName}
              />
              <DownloadCard 
                title="Node.js"
                language="nodejs"
                icon="📦"
                description="For Node.js applications"
                appName={appName}
              />
              <DownloadCard 
                title="PHP"
                language="php"
                icon="🐘"
                description="For PHP applications"
                appName={appName}
              />
              <DownloadCard 
                title="VB.NET"
                language="vbnet"
                icon="VB"
                description="For VB.NET applications"
                appName={appName}
              />
              <DownloadCard 
                title="Java"
                language="java"
                icon="☕"
                description="For Java applications"
                appName={appName}
              />
            </div>

            <div className="mt-8 bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">How to use</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Download the code for your programming language</li>
                <li>Add the file to your project</li>
                <li>Use the authentication functions in your software</li>
              </ol>
            </div>
          </>
        )}
      </div>
 
      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">
              Generate New User
            </h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">License Duration</label>
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
                  <option value="custom">Custom Date</option>
                </select>
              </div>
              {newUser.expires === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Select Expiry Date</label>
                  <input
                    type="date"
                    value={newUser.customDate}
                    onChange={(e) => setNewUser({ ...newUser, customDate: e.target.value })}
                    className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}
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
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a22] border border-[#2a2a3a] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">
              Edit User
            </h2>
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={editUser.password}
                  onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">License Duration</label>
                <select
                  value={editUser.expires}
                  onChange={(e) => setEditUser({ ...editUser, expires: e.target.value })}
                  className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                >
                  <option value="never">Never</option>
                  <option value="1day">1 Day</option>
                  <option value="7days">7 Days</option>
                  <option value="30days">30 Days</option>
                  <option value="1year">1 Year</option>
                  <option value="custom">Custom Date</option>
                </select>
              </div>
              {editUser.expires === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Select Expiry Date</label>
                  <input
                    type="date"
                    value={editUser.customDate}
                    onChange={(e) => setEditUser({ ...editUser, customDate: e.target.value })}
                    className="w-full px-4 py-2 bg-[#121218] border border-[#2a2a3a] rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditUser(false); setEditingUser(null); }}
                  className="flex-1 py-2 bg-[#2a2a3a] hover:bg-[#3a3a4a] rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}