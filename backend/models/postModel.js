import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Creates a relationship with the User model
        },
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false, // For soft-deleting posts
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);
export default Post;