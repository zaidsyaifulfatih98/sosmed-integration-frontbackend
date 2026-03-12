type Post = {
    id: number;
    title: string;
    description: string;
    author?: {
        name: string;
    };
    createdAt: string;
};

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="bg-white shadow rounded-lg p-5 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
                {post.title}
            </h2>

            <p className="text-gray-600">
                {post.description}
            </p>

            <div className="flex justify-between text-sm text-gray-400">
                {post.author && <span>By {post.author.name}</span>}

                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}