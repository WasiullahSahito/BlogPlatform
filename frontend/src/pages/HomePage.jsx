import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/api';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts. The server might be down.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h1>Latest Posts</h1>
            {posts.length === 0 ? (
                <p>No posts found. Why not log in and create one?</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <h2>
                            <Link to={`/post/${post._id}`}>{post.title}</Link>
                        </h2>
                        <p>
                            by <strong>{post.author.username}</strong> on{' '}
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                        <p>{post.content.substring(0, 200)}...</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default HomePage;