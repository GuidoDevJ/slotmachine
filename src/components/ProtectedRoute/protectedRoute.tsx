"use client";

import { MainSpinner } from "@/ui/Loaders";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const expirationTime = decoded.exp * 1000;
      const now = Date.now();

      if (now > expirationTime) {
        router.push("/login");
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("Error decoding token", error);
      router.push("/login");
    }
  }, [router]);

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <MainSpinner />
      </div>
    );
  }

  return (
    <div className="min-w-[100vw]">
      <Header />
      <div className="w-[100vw] min-h-[100vh]">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
