import { Document, model, Schema, Types } from 'mongoose';

export interface IMessage extends Document {
  from: any;
  to: any;
  data: string;
}

const MessageSchema = new Schema({
  from: {
    type: Types.ObjectId,
    required: true,
    ref: "User"
  },
  to: {
    type: Types.ObjectId,
    required: true,
    ref: "User"
  },
  data: {
    type: String
  },
}, {
  timestamps: true
});

export const Message = model<IMessage>("Message", MessageSchema);
