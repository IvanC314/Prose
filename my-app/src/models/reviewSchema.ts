import mongoose, {Schema, Document, Model} from "mongoose";

interface ReviewItem extends Document {
    title: string;
    description?: string;
    image?: string;
    updated_date: Date;
}

const itemSchema = new Schema<ReviewItem>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
});

const Item: Model<ReviewItem> = mongoose.models.Item || mongoose.model<ReviewItem>("Item", itemSchema);
export default Item;