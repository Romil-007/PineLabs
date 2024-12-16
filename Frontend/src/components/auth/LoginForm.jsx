import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { validateEmail } from "../../utils/validators";

function LoginForm({ onOtpLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!formData.password) {
            toast.error("Please enter your password");
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                //add a secure tag below once it starts going onto https way;
                document.cookie = `token=${data.token}; path=/; HttpOnly; SameSite=Strict`;
                toast.success("Successfully logged in!");
                navigate("/");
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("Login failed");
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Sign in to your account to continue
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email address"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    required
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={formData.rememberMe}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    rememberMe: e.target.checked,
                                })
                            }
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary-600 hover:text-primary-500">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Sign in
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={onOtpLogin}>
                    Sign in with Email/Phone
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-primary-600 hover:text-primary-500">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
