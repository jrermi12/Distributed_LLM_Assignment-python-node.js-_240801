import mongoose, { Document, Schema } from 'mongoose';

interface IConversation extends Document {
    userId: string;
    query: string;
    response: string;
    createdAt: Date;
}

const ConversationSchema: Schema = new Schema({
    userId: { 
        type: String, 
        required: [true, 'User ID is required'],
        minlength: [1, 'User ID cannot be empty']
    },
    query: { 
        type: String, 
        required: [true, 'Query is required'],
        minlength: [1, 'Query cannot be empty']
    },
    response: { 
        type: String, 
        required: [true, 'Response is required'],
        minlength: [1, 'Response cannot be empty']
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        validate: {
            validator: (v: Date) => v instanceof Date && !isNaN(v.getTime()), // Checks if the value is a valid Date object
            message: 'Invalid date'
        }
    }
});

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
