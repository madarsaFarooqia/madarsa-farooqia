import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { FarooqiaLogo, AuthBackground } from "../../assets";

const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Reset password data:", data);
    toast.success("Password has been reset successfully!");
    setIsSuccess(true);
    // In a real app, you might redirect after a delay
    setTimeout(() => navigate("/login"), 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center space-y-6 bg-card p-10 rounded-2xl shadow-xl border"
        >
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Password Reset Complete</h2>
            <p className="text-muted-foreground">
              Your password has been successfully updated. You will be redirected to the login page shortly.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link to="/login">Go to Login</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

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
              className="w-32 h-32 mx-auto drop-shadow-2xl"
            />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-primary font-playfair">
              Secure Your Account
            </h1>
            <p className="text-muted-foreground font-inter">
              Choose a strong password that you haven't used before. Your security is our top priority.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-2 text-primary/60">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider italic">Encryption Active</span>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Reset Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[400px] space-y-8"
        >
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Set New Password</h2>
            <p className="text-muted-foreground text-sm">
              Please enter your new password below. Ensure it meets the security requirements.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
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

              <Button type="submit" className="w-full h-11 text-base font-semibold">
                Reset Password
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Cancel and go back
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
