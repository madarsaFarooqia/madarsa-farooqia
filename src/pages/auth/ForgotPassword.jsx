import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
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

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Forgot password request:", data);
    toast.success("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      {/* Left Side: Illustration & Branding (Smaller version) */}
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
              Reset Your Password
            </h1>
            <p className="text-muted-foreground font-inter">
              Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Side: Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[400px] space-y-8"
        >
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Forgot Password?</h2>
            <p className="text-muted-foreground text-sm">
              Enter your registered email address and we'll send you a link to reset your password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
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

              <Button type="submit" className="w-full h-11 text-base font-semibold">
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
