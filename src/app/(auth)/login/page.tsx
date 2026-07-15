"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Radio, Button, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { API } from "@/api-services/api";
import Cookies from "js-cookie";

interface LoginFormValues {
  email: string;
  password: string;
  remember: string;
}

function Page() {
  const [form] = Form.useForm<LoginFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await API.post("/auth/login", values);
      const token = response.data.data.token;

      const user = response.data.data.user;

      if (token) {
        Cookies.set("token", token);
        message.success("Login successful!");

        // Store profile in cache
        localStorage.setItem("adminProfile", JSON.stringify(user));
        localStorage.setItem("profileTimestamp", Date.now().toString());

        setTimeout(() => {
          window.location.pathname = "/";
        }, 500);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#F1F2F6]">
      {/* Background decorative shapes */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/70" />
      <div className="pointer-events-none absolute -right-52 top-0 h-[700px] w-[700px] rounded-full bg-white/60" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[480px] w-[600px] rounded-[45%] bg-white/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-14">
        <div className="flex w-full max-w-6xl items-center justify-between gap-10">
          {/* Left illustration */}
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative h-[520px] w-full max-w-[620px]">
              <Image
                src="/images/login.png"
                alt="Login illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right login card */}
          <div className="w-full max-w-[420px] rounded-2xl bg-white px-10 py-12 shadow-[0_20px_60px_rgba(17,17,50,0.08)]">
            {/* Logo */}
            <div className="mb-7 flex justify-center">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1E7AF7] text-lg font-bold text-white">
                  B
                </span>
                <span className="text-2xl font-bold text-[#151E3D]">
                  Buddy
                  <span className="font-medium text-[#1E7AF7]">Script</span>
                </span>
              </div>
            </div>

            <p className="mb-1 text-center text-sm text-gray-500">
              Welcome back
            </p>
            <h4 className="mb-9 text-center text-2xl font-semibold text-[#151E3D]">
              Login to your account
            </h4>

            {/* Google sign in */}
            <button
              type="button"
              className="mb-9 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-medium text-[#151E3D] transition hover:border-gray-300 hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              <span>Or sign-in with google</span>
            </button>

            {/* Divider */}
            <div className="mb-9 flex items-center gap-4">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">Or</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Form */}
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              initialValues={{ remember: "yes" }}
            >
              <Form.Item
                label={
                  <span className="text-sm font-medium text-[#151E3D]">
                    Email
                  </span>
                }
                name="email"
                className="mb-3.5"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  size="large"
                  className="rounded-lg"
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm font-medium text-[#151E3D]">
                    Password
                  </span>
                }
                name="password"
                className="mb-3.5"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  size="large"
                  className="rounded-lg"
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div className="mb-10 mt-1 flex items-center justify-between">
                <Form.Item name="remember" noStyle>
                  <Radio.Group>
                    <Radio value="yes">
                      <span className="text-sm text-[#151E3D]">
                        Remember me
                      </span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
                <a
                  href="#0"
                  className="text-sm text-[#1E7AF7] hover:text-[#1660c9]"
                >
                  Forgot password?
                </a>
              </div>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isSubmitting}
                  block
                  className="rounded-lg border-none bg-[#1E7AF7] font-medium hover:!bg-[#1660c9]"
                >
                  Login now
                </Button>
              </Form.Item>
            </Form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#1E7AF7] hover:text-[#1660c9]"
              >
                Create New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
