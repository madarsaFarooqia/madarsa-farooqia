import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Phone } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useAuth } from "../../lib/AuthContext";

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
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

const Signup = () => {
  const { register, isRegistering } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const signupSchema = z.object({
    firstName: z.string().min(2, { message: t("signup:first_name_err", "First name is required") }),
    lastName: z.string().min(2, { message: t("signup:last_name_err", "Last name is required") }),
    email: z.string().email({ message: t("signup:invalid_email", "Invalid email address") }),
    phoneNumber: z.string().optional(),
    password: z.string().min(8, { message: t("signup:min_length", "Password must be at least 8 characters") }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("signup:match_error", "Passwords don't match"),
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...registerData } = values;
      await register(registerData);
      toast.success(t("signup:success_toast", "Account created successfully! Please sign in."));
      navigate("/login");
    } catch (error) {
      toast.error(error.message || t("signup:failed_toast", "Registration failed"));
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
              {t("signup:left_title", "Join Our Community")}
            </h1>
            <p className="text-lg text-muted-foreground font-inter">
              {t("signup:left_desc", "Begin your journey with Madrasa Farooqia. Create an account to access student resources, faculty tools, and administrative portals.")}
            </p>
          </div>
          <div className="flex justify-center space-x-6 pt-4 text-primary/60">
            <ShieldCheck className="h-8 w-8" />
            <User className="h-8 w-8" />
            <Mail className="h-8 w-8" />
          </div>
        </div>
      </motion.div>

      {/* Right Side: Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-background overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[520px] space-y-8 my-auto"
        >
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{t("signup:right_title", "Create Account")}</h2>
            <p className="text-muted-foreground">
              {t("signup:right_desc", "Enter your details to request access to the platform.")}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("signup:first_name_label", "First Name")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="John"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("signup:last_name_label", "Last Name")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Doe"
                            className="pl-10 h-11"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signup:email_label", "Email Address")}</FormLabel>
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signup:phone_label", "Phone Number (Optional)")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="+1 (555) 000-0000"
                          className="pl-10 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("signup:password_label", "Password")}</FormLabel>
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
                      <FormLabel>{t("signup:confirm_password_label", "Confirm Password")}</FormLabel>
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
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={isRegistering} className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]">
                  {isRegistering ? t("signup:registering", "Registering...") : t("signup:create_account_btn", "Create Account")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("signup:continue_with", "Or sign up with")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="h-11 hover:bg-red-50 transition-colors">
              <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
              {t("signup:google_btn", "Google")}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            {t("signup:have_account", "Already have an account?")}{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              {t("signup:sign_in", "Sign In")}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
