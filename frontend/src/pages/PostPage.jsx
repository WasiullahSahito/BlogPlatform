import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../services/api';

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPostById(id);
                setPost(response.data);
            } catch (err) {
                setError('Post not found or an error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id);
                navigate('/');
            } catch (err) {
                setError('Failed to delete the post.');
            }
        }
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!post) return <p>Post could not be loaded.</p>;

    const isOwner = user && user._id === post.author._id;

    return (
        <div className="post-card">
            <h1>{post.title}</h1>
            <p>
                by <strong>{post.author.username}</strong> on{' '}
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <hr />
            <p className="post-content">{post.content}</p>

            {isOwner && (
                <div className="post-actions">
                    <Link to={`/edit-post/${id}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete} className="button-danger">Delete</button>
                </div>
            )}
        </div>
    );
};

export default PostPage;