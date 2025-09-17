import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../services/api';

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPostById(id);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (err) {
                setError('Failed to load post data. You may not have permission to edit this.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await updatePost(id, { title, content });
            navigate(`/post/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update post.');
        }
    };

    if (loading) return <p>Loading editor...</p>;
    if (error && !title) return <p className="error">{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            {error && <p className="error">{error}</p>}
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea rows="15" placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default EditPostPage;