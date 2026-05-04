import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FarooqiaLogo, AuthBackground } from "@/assets";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

const Login = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Welcome back! You are now logged in to Darul Uloom Farooqia");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      {/* Left Side: Illustration & Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-primary/5 items-center justify-center p-12 overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(${AuthBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        <div className="relative z-10 max-w-lg text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img
              src={FarooqiaLogo}
              alt="Farooqia Logo"
              className="w-40 h-40 mx-auto drop-shadow-2xl"
            />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-primary font-playfair">
              Madarsah Darul Uloom Farooqia
            </h1>
            <p className="text-lg text-muted-foreground font-inter">
              Empowering the next generation of scholars with traditional values and modern excellence.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[440px] space-y-8"
        >
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">
              Please enter your credentials to access your portal.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="name@example.com"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 py-1">
                    <FormControl>
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoggingIn} className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]">
                {isLoggingIn ? "Signing In..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="h-11 hover:bg-red-50 transition-colors">
              <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
              Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              Request Access
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
