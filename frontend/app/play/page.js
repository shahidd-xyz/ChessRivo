"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkUser } from "../../lib/auth";

import Navbar from "../home/Navbar";
import Hero from "./Hero";
import CreateRoom from "./CreateRoom";
import Footer from "../home/Footer";

export default function PlaySection() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const data = await checkUser();

      if (!data.success) {
        router.replace("/play");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    verifyUser();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Checking authentication...</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <Hero />
      <CreateRoom />
      <Footer />
    </>
  );
}
