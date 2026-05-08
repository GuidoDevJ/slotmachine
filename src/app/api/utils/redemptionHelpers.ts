const DEFAULT_EXPIRY_MINUTES = 15;

export function getExpiryMinutes(): number {
  const envValue = process.env.REDEMPTION_EXPIRY_MINUTES;
  if (envValue) {
    const parsed = parseInt(envValue, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return DEFAULT_EXPIRY_MINUTES;
}

export function isExpired(createdAt: Date): boolean {
  const expiryMs = getExpiryMinutes() * 60 * 1000;
  return Date.now() > new Date(createdAt).getTime() + expiryMs;
}

export function getExpiresAt(createdAt: Date): Date {
  const expiryMs = getExpiryMinutes() * 60 * 1000;
  return new Date(new Date(createdAt).getTime() + expiryMs);
}

export function computeStatus(
  redeemed: boolean,
  createdAt: Date
): 'pendiente' | 'canjeado' | 'expirado' {
  if (redeemed) return 'canjeado';
  if (isExpired(createdAt)) return 'expirado';
  return 'pendiente';
}

export function enrichRedemption(doc: any) {
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  return {
    ...obj,
    expired: isExpired(obj.createdAt),
    expiresAt: getExpiresAt(obj.createdAt).toISOString(),
    status: computeStatus(obj.redeemed, obj.createdAt),
    timeRemainingMs: Math.max(0, getExpiresAt(obj.createdAt).getTime() - Date.now()),
  };
}
