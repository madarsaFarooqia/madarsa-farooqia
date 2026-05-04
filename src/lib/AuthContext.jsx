import React, { createContext, useContext, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { getStoredToken } from "@/services/http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // 1. Query for the current authenticated user
  const {
    data: user,
    isLoading: isLoadingAuth,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: authService.me,
    enabled: !!getStoredToken(), // Only run if we have a token
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // 2. Mutation for Login
  const loginMutation = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Invalidate and refetch user query
      queryClient.setQueryData(["auth-user"], data.user || data);
      // Optional: redirect or show success
    },
  });

  // 3. Mutation for Register
  const registerMutation = useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data.user || data);
    },
  });

  const logout = (redirectTo = "/") => {
    authService.logout(redirectTo);
    queryClient.setQueryData(["auth-user"], null);
    queryClient.clear();
  };

  const isAuthenticated = !!user && !isError;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
        logout,
        checkUserAuth: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
