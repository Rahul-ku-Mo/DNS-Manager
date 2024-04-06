import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const SignupPage = () => {
  const { signup } = useAuth();

  const navigate = useNavigate();

  const [values, setValues] = useState<{
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleChange =
    (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !values.email ||
      !values.password ||
      !values.firstname ||
      !values.lastname
    ) {
      return;
    }

    await signup(
      values.email,
      values.password,
      values.firstname,
      values.lastname
    );

    toast("Account created successfully");

    navigate("/dashboard");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
      <div className="w-full p-2 text-2xl bg-slate-200/20 shadow-sm font-bold tracking-tighter capitalize fixed top-0 flex items-start">
        DNS Dashboard
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    required
                    value={values.lastname}
                    onChange={handleChange("lastname")}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  type="password"
                  required
                  placeholder="password"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  !values.email ||
                  !values.password ||
                  !values.firstname ||
                  !values.lastname
                }
              >
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
      <Link
        to="https://github.com/Rahul-ku-Mo/DNS-Manager"
        target="_blank"
        className="w-full p-2 text-sm text-slate-600 hover:text-slate-800 bg-slate-200/20 shadow-sm font-bold fixed bottom-0 flex justify-end items-center gap-2"
      >
        Check out this page <GitHubLogoIcon />
      </Link>
    </div>
  );
};

export default SignupPage;
