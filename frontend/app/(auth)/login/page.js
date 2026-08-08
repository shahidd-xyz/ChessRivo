"use client";

import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { ChessKnight, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 bg-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(45,106,79,.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,106,79,.03) 1px, transparent 1px)
        `,
        backgroundSize: "42px 42px",
      }}
    >
      <div className="w-full max-w-5xl rounded-3xl border border-[#2d6a4f]/15 bg-white shadow-[0_15px_50px_rgba(45,106,79,0.08)] overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Section */}
          <div className="hidden lg:flex flex-col justify-center bg-[#2d6a4f] text-white p-12">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
              <ChessKnight size={46} />
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome
              <br />
              Back
            </h1>

            <p className="mt-6 text-white/80 leading-7">
              Sign in to continue your chess journey, compete with players
              worldwide, track your rating, and improve your game with every
              move.
            </p>
          </div>

          {/* Right Section */}
          <div className="p-8 md:p-10">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-[#2d6a4f]/10 flex items-center justify-center">
                <ChessKnight size={34} className="text-[#2d6a4f]" />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2d6a4f]">Sign In</h2>

              <p className="mt-2 text-[#2d6a4f]/70">
                Login to your ChessRivo account.
              </p>
            </div>

            <Formik
              initialValues={{
                identifier: "",
                password: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (!values.identifier.trim()) {
                  toast.error("Username or Email is required");
                  setSubmitting(false);
                  return;
                }

                if (!values.password.trim()) {
                  toast.error("Password is required");
                  setSubmitting(false);
                  return;
                }

                try {
                  const response = await axios.post(
                    "http://localhost:8080/api/auth/login",
                    {
                      identifier: values.identifier,
                      password: values.password,
                    },
                    {
                      withCredentials: true,
                    },
                  );

                  toast.success("Login successful!");
                  router.push("/");
                } catch (err) {
                  console.log(err);
                  console.log("LoginForm error");

                  toast.error(err.response?.data?.message || "Login Failed");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <Form className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#2d6a4f] mb-2">
                    Username or Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d6a4f]/50"
                    />

                    <Field
                      name="identifier"
                      type="text"
                      placeholder="Enter your username or email"
                      className="w-full rounded-xl border border-[#2d6a4f]/20 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[#2d6a4f]">
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#2d6a4f]/70 hover:text-[#2d6a4f]"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d6a4f]/50"
                    />

                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-[#2d6a4f]/20 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#2d6a4f] py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Sign In
                </button>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#2d6a4f]/15"></div>

                  <span className="text-xs font-medium tracking-widest text-[#2d6a4f]/50">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#2d6a4f]/15"></div>
                </div>

                <p className="text-center text-sm text-[#2d6a4f]/70">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-[#2d6a4f] hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
