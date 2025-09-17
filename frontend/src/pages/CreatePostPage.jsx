import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim() || !content.trim()) {
            setError('Title and content cannot be empty.');
            return;
        }
        try {
            const response = await createPost({ title, content });
            navigate(`/post/${response.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post. Are you logged in?');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            {error && <p className="error">{error}</p>}
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea rows="15" placeholder="Write your content here..." value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">Publish Post</button>
        </form>
    );
};

export default CreatePostPage;