import { useState } from "react";
import client from "../api/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const login = async () => {
    const res = await client.post("/auth/login", { email });
    localStorage.setItem("token", res.data.token);
    location.href = "/";
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded">
        <input onChange={(e) => setEmail(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}