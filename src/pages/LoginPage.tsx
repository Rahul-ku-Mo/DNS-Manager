import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [values, setValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange =
    (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }

    await login(values.email, values.password);

    toast.success("Loggedin successfully");

    navigate("/dashboard");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
      <div className="w-full p-2 text-2xl bg-slate-200/20 shadow-sm font-bold tracking-tighter capitalize fixed top-0 flex items-start">
        DNS Dashboard
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={values.email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={values.password}
                onChange={handleChange("password")}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!values.email || !values.password}
            >
              Sign in
            </Button>
          </CardFooter>
          <div className="pb-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </Card>
      <Link
        target="_blank"
        to="https://github.com/Rahul-ku-Mo/DNS-Manager"
        className="w-full p-2 text-sm text-slate-600 hover:text-slate-800 bg-slate-200/20 shadow-sm font-bold fixed bottom-0 flex justify-end items-center gap-2"
      >
        Check out this page <GitHubLogoIcon />
      </Link>
    </div>
  );
};

export default LoginPage;
