import { useEffect, useState } from "react";
import { useBlog } from "../hooks/useBlog";
import PostCard from "../components/PostCard";

type Post = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author?: {
        name: string;
    };
};

export default function BlogPage() {
    const { getPosts } = useBlog();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 w-full">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 shadow-sm w-full">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-blue-600 font-bold text-xl tracking-tight">
                        ✍️ DevBlog
                    </h1>
                    <div className="flex gap-4">
                        <a
                            href="/feeds"
                            className="text-gray-600 hover:text-blue-600 font-medium transition text-sm"
                        >
                            Feeds
                        </a>
                        <a
                            href="/admin"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition"
                        >
                            Admin
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 w-full border-b border-blue-100">
                <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        Blog
                    </span>
                    <h2 className="text-4xl font-extrabold text-gray-800 mt-4">
                        Latest Articles
                    </h2>
                    <p className="text-gray-500 mt-3 text-lg">
                        Discover tutorials, insights, and developer stories.
                    </p>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-lg">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-lg">No posts yet.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white mt-10">
                <div className="max-w-5xl mx-auto px-6 py-6 text-center text-gray-400 text-sm">
                    © 2026 DevBlog. All rights reserved.
                </div>
            </footer>

        </div>
    );
}