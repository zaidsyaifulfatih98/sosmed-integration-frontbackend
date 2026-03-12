import { useEffect, useState } from "react";
import { useBlog } from "../hooks/useBlog";
import { useNavigate } from "react-router-dom";

type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author?: {
        name: string;
    };
};

export default function AdminPage() {
    const { getPosts, createPost } = useBlog();
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            setPosts([]);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Title and content are required");
            return;
        }

        const authorId = localStorage.getItem("userId");
        if (!authorId) {
            setError("You must be logged in to create a post");
            return;
        }

        try {
            setLoading(true);
            await createPost({ title, content, authorId });
            setTitle("");
            setContent("");
            await fetchPosts();
        } catch (err) {
            console.error("Failed to create post:", err);
            setError("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            🛠️ Admin Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm">Manage your blog posts</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <a
                            href="/"
                            className="text-sm text-gray-500 hover:text-blue-600 transition font-medium"
                        >
                            ← View Blog
                        </a>
                        <button
                            onClick={handleLogout}
                            className="text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">

                {/* Create Post */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">
                        Create New Post
                    </h2>
                    <p className="text-gray-400 text-sm mb-5">
                        Write and publish a new article
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-600 text-sm font-medium mb-1 block">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter post title"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 text-sm font-medium mb-1 block">
                                Content
                            </label>
                            <textarea
                                placeholder="Write your post content..."
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition h-36 resize-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition text-white font-semibold py-3 rounded-lg"
                        >
                            {loading ? "Publishing..." : "🚀 Publish Post"}
                        </button>
                    </form>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">
                            All Posts
                        </h2>
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {posts.length} posts
                        </span>
                    </div>

                    {posts.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-400">
                            <p className="text-4xl mb-2">📝</p>
                            <p className="text-sm">No posts yet. Create your first one!</p>
                        </div>
                    )}

                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-gray-800 font-semibold text-base">
                                {post.title}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                {post.content}
                            </p>
                            <div className="flex justify-between text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
                                <span className="flex items-center gap-1">
                                    👤 {post.author?.name || "Unknown"}
                                </span>
                                <span>
                                    {new Date(post.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}