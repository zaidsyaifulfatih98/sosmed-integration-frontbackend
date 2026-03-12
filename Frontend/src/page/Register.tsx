import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                { name, email, password }
            );
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-600">✍️ DevBlog</h1>
                    <p className="text-gray-500 text-sm mt-1">Your personal blogging platform</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">

                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-400 text-sm mt-1">Join us today, it's free!</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="text-gray-600 text-sm font-medium mb-1 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 text-sm font-medium mb-1 block">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-600 text-sm font-medium mb-1 block">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Min. 6 characters"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition text-white font-semibold py-3 rounded-lg mt-2"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>

                    </form>

                    <p className="text-center text-gray-400 text-sm mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Login here
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}