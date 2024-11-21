"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from '../../utils/supabaseClient';
import CustomerForm from "../customer-form";
import Quotation from "../quotation";
import History from "../history";

export default function Home() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("CustomerForm");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login"); 
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };



  const renderPage = () => {
    switch (activePage) {
      case "CustomerForm":
        return <CustomerForm />;
      case "Quotation":
        return <Quotation />;
      case "History":
        return <History />;
      default:
        return <CustomerForm />;
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-gray-100 text-gray-800">
      
      

      
      <nav className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activePage === "CustomerForm"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setActivePage("CustomerForm")}
        >
          Customer Form
        </button>
        <button
          className={`px-4 py-2 rounded ${activePage === "Quotation"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setActivePage("Quotation")}
        >
          Quotation
        </button>
        <button
          className={`px-4 py-2 rounded ${activePage === "History"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setActivePage("History")}
        >
          History
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>;
      </nav>



      
      <main className="bg-white p-6 rounded shadow-md">
        {renderPage()}
      </main>
    </div>
  );
}
