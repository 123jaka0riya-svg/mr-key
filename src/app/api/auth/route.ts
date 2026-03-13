import { NextResponse } from "next/server";

interface User {
  id: string;
  username: string;
  password: string;
  key: string;
  createdAt: string;
  expires: string;
  level: number;
}

const getUsers = (): User[] => {
  if (typeof global !== 'undefined' && (global as any).appUsers) {
    return (global as any).appUsers;
  }
  return [];
};

const setUsers = (users: User[]) => {
  if (typeof global !== 'undefined') {
    (global as any).appUsers = users;
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, username, password, appname } = body;

    if (type === "login") {
      if (!username || !password || !appname) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }

      const users = getUsers();
      const user = users.find(
        (u) => 
          u.username.toLowerCase() === username.toLowerCase() && 
          u.password === password &&
          u.key
      );

      if (user) {
        return NextResponse.json({
          success: true,
          message: "Login successful",
          user: {
            username: user.username,
            key: user.key,
            expires: user.expires
          }
        });
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    if (type === "register") {
      if (!username || !password || !appname) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }

      const users = getUsers();
      const existingUser = users.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );

      if (existingUser) {
        return NextResponse.json(
          { success: false, message: "Username already exists" },
          { status: 400 }
        );
      }

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let key = "";
      for (let i = 0; i < 24; i++) {
        if (i > 0 && i % 4 === 0) key += "-";
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        password,
        key,
        createdAt: new Date().toISOString().split("T")[0],
        expires: "Never",
        level: 1,
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);

      return NextResponse.json({
        success: true,
        message: "Registration successful",
        user: {
          username: newUser.username,
          key: newUser.key,
          expires: newUser.expires
        }
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid request type" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
