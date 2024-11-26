"use client";

import { IconEmail } from "@/components/icons/email";
import { IconEye } from "@/components/icons/eye";
import { IconEyeOff } from "@/components/icons/eye-off";
import { IconPasswordOutline } from "@/components/icons/password";
import { IconUserOutline } from "@/components/icons/user";
import { Checkbox } from "@/lib/shadcn/checkbox";
import { signup } from "@/services/auth";
import { Spinner } from "@nextui-org/spinner";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [hidingPassword, setHidingPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hidingConfirmPassword, setHidingConfirmPassword] = useState(true);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    } else if (username.length > 20) {
      newErrors.username = "Username must be less than 20 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // If there are no errors, return true, else false
    return (
      !newErrors.email && !newErrors.password && !newErrors.confirmPassword
    );
  };

  const handleSuccess = (data: any) => {
    toast.success(data.message);
    setIsLoading(false);
  };
  const handleFail = (err: any) => {
    toast.error(err);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (validate()) {
      // TODO: create a universal function to call api
      let reqData = {
        email,
        username,
        password,
        role: isTeacher ? "TEACHER" : "STUDENT",
      };
      setIsLoading(true);
      signup(reqData, handleSuccess, handleFail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex px-4 gap-4 items-center rounded-md border border-gray-200">
        <label htmlFor="email">
          <IconEmail className="opacity-40 scale-125" />
        </label>
        <input
          id="email"
          aria-label="Email"
          className="h-[50px] focus:outline-none flex-1"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-xs font-semibold mt-1">
          {errors.email}
        </p>
      )}

      <div className="flex px-4 gap-4 items-center rounded-md border border-gray-200 mt-4">
        <label htmlFor="username">
          <IconUserOutline className="opacity-40 scale-125" />
        </label>
        <input
          id="username"
          aria-label="Username"
          className="h-[50px] focus:outline-none flex-1"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {errors.username && (
        <p className="text-red-500 text-xs font-semibold mt-1">
          {errors.username}
        </p>
      )}

      <div className="flex px-4 gap-4 items-center rounded-md border border-gray-200 mt-4">
        <label htmlFor="password">
          <IconPasswordOutline className="opacity-40 scale-125" />
        </label>
        <input
          id="password"
          aria-label="Password"
          className="h-[50px] focus:outline-none flex-1"
          placeholder="Password"
          type={hidingPassword ? "password" : "text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!hidingPassword ? (
          <IconEye
            className="scale-150 opacity-50"
            onClick={() => setHidingPassword(true)}
          />
        ) : (
          <IconEyeOff
            className="scale-150 opacity-50"
            onClick={() => setHidingPassword(false)}
          />
        )}
      </div>
      {errors.password && (
        <p className="text-red-500 text-xs font-semibold mt-1">
          {errors.password}
        </p>
      )}

      <div className="flex px-4 gap-4 items-center rounded-md border border-gray-200 mt-4">
        <label htmlFor="confirm-password">
          <IconPasswordOutline className="opacity-40 scale-125" />
        </label>
        <input
          id="confirm-password"
          aria-label="Confirm Password"
          className="h-[50px] focus:outline-none flex-1"
          placeholder="Confirm Password"
          type={hidingConfirmPassword ? "password" : "text"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!hidingConfirmPassword ? (
          <IconEye
            className="scale-150 opacity-50"
            onClick={() => setHidingConfirmPassword(true)}
          />
        ) : (
          <IconEyeOff
            className="scale-150 opacity-50"
            onClick={() => setHidingConfirmPassword(false)}
          />
        )}
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs font-semibold mt-1">
          {errors.confirmPassword}
        </p>
      )}
      <div className="flex items-center space-x-2 mt-4">
        <div className="flex-1" />
        <Checkbox
          id="teacher-mode"
          checked={isTeacher}
          onCheckedChange={(checked: boolean) => setIsTeacher(checked)}
        />
        <label
          htmlFor="teacher-mode"
          className="text-sm font-semibold text-gray-800 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {" "}
          Are you a teacher?
        </label>
      </div>
      <button
        type="submit"
        className="w-full rounded-md flex justify-center items-center bg-blue-600 hover:bg-blue-500 text-white h-[50px] border-transparent border mt-4 font-semibold"
      >
        {isLoading && <Spinner size="sm" color="white" />}
        {!isLoading && "Sign up"}
      </button>
    </form>
  );
}
