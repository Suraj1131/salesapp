"use client";

import { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient";
import Login from "./login";
import Home from "./dashboard/home";

export default function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Home /> : <Login />;
}
