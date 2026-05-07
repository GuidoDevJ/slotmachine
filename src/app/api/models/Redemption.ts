import mongoose, { Document, Schema } from 'mongoose';

export interface IRedemption extends Document {
  code: string;
  productName: string;
  productImageURL: string;
  productId?: mongoose.Types.ObjectId;
  redeemed: boolean;
  redeemedAt?: Date;
  createdAt: Date;
}

const redemptionSchema = new Schema<IRedemption>({
  code: {
    type: String,
    required: [true, 'El codigo de canje es obligatorio'],
    unique: true,
    index: true,
  },
  productName: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
  },
  productImageURL: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria'],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  redeemed: {
    type: Boolean,
    default: false,
  },
  redeemedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RedemptionModel =
  mongoose.models.Redemption ||
  mongoose.model<IRedemption>('Redemption', redemptionSchema);

export default RedemptionModel;
