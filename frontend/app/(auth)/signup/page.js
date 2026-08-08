"use client";

import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { ChessKnight, User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function Signup() {
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
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center bg-[#2d6a4f] text-white p-12">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
              <ChessKnight size={46} />
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome to
              <br />
              ChessRivo
            </h1>

            <p className="mt-6 text-white/80 leading-7">
              Join a growing community of chess players, compete in exciting
              matches, improve your rating, and sharpen your strategy with every
              move.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-8 md:p-10">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-[#2d6a4f]/10 flex items-center justify-center">
                <ChessKnight size={34} className="text-[#2d6a4f]" />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2d6a4f]">
                Create Account
              </h2>

              <p className="mt-2 text-[#2d6a4f]/70">
                Create your account and start playing.
              </p>
            </div>

            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (values.password !== values.confirmPassword) {
                  toast.error("Passwords do not match");
                  return;
                }

                if (!values.username.trim()) {
                  toast.error("Username is required");
                  setSubmitting(false);
                  return;
                }

                if (!values.email.trim()) {
                  toast.error("Email is required");
                  setSubmitting(false);
                  return;
                }

                if (!values.password.trim()) {
                  toast.error("Password is required");
                  setSubmitting(false);
                  return;
                }

                if (!values.confirmPassword.trim()) {
                  toast.error("Confirm Password is required");
                  setSubmitting(false);
                  return;
                }

                try {
                  const response = await axios.post(
                    "https://chessrivo.onrender.com/api/auth/signup",
                    {
                      username: values.username,
                      email: values.email,
                      password: values.password,
                    },
                    {
                      withCredentials: true,
                    },
                  );

                  toast.success(response.data.message);
                  router.push("/login");
                } catch (err) {
                  console.log(err);
                  toast.error(
                    err.response?.data?.message || "Registration failed",
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <Form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-[#2d6a4f] mb-2">
                      Username
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d6a4f]/50"
                      />

                      <Field
                        name="username"
                        placeholder="Username"
                        className="w-full rounded-xl border border-[#2d6a4f]/20 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#2d6a4f] mb-2">
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d6a4f]/50"
                      />

                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl border border-[#2d6a4f]/20 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#2d6a4f] mb-2">
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d6a4f]/50"
                      />

                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl border border-[#2d6a4f]/20 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-[#2d6a4f] mb-2">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2d6a4f]/50"
                      />

                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full rounded-xl border border-[#2d6a4f]/20 py-3 pl-11 pr-4 outline-none transition-all duration-200 focus:border-[#2d6a4f] focus:ring-4 focus:ring-[#2d6a4f]/10"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#2d6a4f] py-3.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Create Account
                </button>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#2d6a4f]/15"></div>

                  <span className="text-xs font-medium tracking-widest text-[#2d6a4f]/50">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#2d6a4f]/15"></div>
                </div>

                <p className="text-center text-sm text-[#2d6a4f]/70">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#2d6a4f] hover:underline"
                  >
                    Sign In
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
