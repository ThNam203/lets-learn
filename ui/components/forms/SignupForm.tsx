"use client";

import { IconEmail } from "@/components/icons/email";
import { IconEye } from "@/components/icons/eye";
import { IconEyeOff } from "@/components/icons/eye-off";
import { IconPasswordOutline } from "@/components/icons/password";
import { IconUserOutline } from "@/components/icons/user";
import GLOBAL from "@/global";
import { useState } from "react";
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SignUpForm() {
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
            newErrors.username = "Username must be >= 6 characters";
        } else if (username.length > 20) {
            newErrors.username = "Username must be <= 20 characters";
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
            !newErrors.email &&
            !newErrors.password &&
            !newErrors.confirmPassword
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (validate()) {
            // TODO: create a universal function to call api
            fetch(GLOBAL.API_URL + "/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password, isTeacher }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.error(err);
                });
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
                <div className="flex-1"/>
                <Checkbox
                    id="teacher-mode"
                    checked={isTeacher}
                    onCheckedChange={(checked: boolean) =>
                        setIsTeacher(checked)
                    }
                />
                <label
                    htmlFor="teacher-mode" className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Are you a teacher?
                </label>
            </div>
            <button
                type="submit"
                className="w-full rounded-md flex justify-center items-center bg-blue-400 hover:bg-blue-500 text-white h-[50px] border-transparent border mt-4 font-semibold"
            >
                SIGN UP
            </button>
        </form>
    );
}


const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName