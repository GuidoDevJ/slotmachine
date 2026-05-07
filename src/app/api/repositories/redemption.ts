import RedemptionModel from '@/app/api/models/Redemption';
import { isExpired } from '@/app/api/utils/redemptionHelpers';
import crypto from 'crypto';

class RedemptionRepository {
  static generateCode(): string {
    const bytes = crypto.randomBytes(6);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[bytes[i % bytes.length] % chars.length];
    }
    return `WIN-${code}`;
  }

  static async create(data: {
    productName: string;
    productImageURL: string;
    productId?: string;
  }) {
    let code: string;
    let exists = true;

    // Generar codigo unico
    do {
      code = this.generateCode();
      const existing = await RedemptionModel.findOne({ code });
      exists = !!existing;
    } while (exists);

    const redemption = await RedemptionModel.create({
      code,
      productName: data.productName,
      productImageURL: data.productImageURL,
      productId: data.productId,
    });

    return redemption;
  }

  static async findByCode(code: string) {
    return RedemptionModel.findOne({ code });
  }

  static async redeem(code: string) {
    const redemption = await RedemptionModel.findOne({ code });

    if (!redemption) {
      throw new Error('Codigo de canje no encontrado');
    }

    if (redemption.redeemed) {
      throw new Error('Este codigo ya fue canjeado');
    }

    if (isExpired(redemption.createdAt)) {
      throw new Error('Este codigo ha expirado');
    }

    redemption.redeemed = true;
    redemption.redeemedAt = new Date();
    await redemption.save();

    return redemption;
  }

  static async getAll() {
    return RedemptionModel.find().sort({ createdAt: -1 });
  }
}

export default RedemptionRepository;
