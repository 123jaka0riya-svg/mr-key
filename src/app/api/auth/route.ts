import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, like } from "drizzle-orm";

const generateKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";
  for (let i = 0; i < 24; i++) {
    if (i > 0 && i % 4 === 0) key += "-";
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

const inMemoryUsers: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, username, password, appname } = body;

    const useDb = db !== null;

    if (type === "login") {
      if (!username || !password || !appname) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }

      let user: any = null;

      if (useDb) {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.username, username.toLowerCase()));
        user = result.find((u: any) => u.password === password && u.key);
      } else {
        user = inMemoryUsers.find(
          (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password && u.key
        );
      }

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

      let existing: any[] = [];
      if (useDb) {
        existing = await db
          .select()
          .from(users)
          .where(eq(users.username, username.toLowerCase()));
      } else {
        existing = inMemoryUsers.filter(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        );
      }

      if (existing.length > 0) {
        return NextResponse.json(
          { success: false, message: "Username already exists" },
          { status: 400 }
        );
      }

      const key = generateKey();
      const newUser = {
        username: username.toLowerCase(),
        password,
        key,
        createdAt: new Date().toISOString().split("T")[0],
        expires: "Never",
        level: 1,
      };

      if (useDb) {
        await db.insert(users).values(newUser);
      } else {
        inMemoryUsers.push({ id: Date.now().toString(), ...newUser });
      }

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

    if (type === "getUsers") {
      let allUsers: any[] = [];
      
      if (useDb) {
        allUsers = await db.select().from(users);
      } else {
        allUsers = inMemoryUsers;
      }

      return NextResponse.json({
        success: true,
        users: allUsers
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid request type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
