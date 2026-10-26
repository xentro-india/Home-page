interface RateLimitRecord {
  timestamps: number[];
  lastHash?: string;
  lastSubmitTime?: number;
}

export class InMemoryRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly duplicateWindowMs: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(options?: { windowMs?: number; maxRequests?: number; duplicateWindowMs?: number }) {
    this.windowMs = options?.windowMs ?? 15 * 60 * 1000; // 15 minutes
    this.maxRequests = options?.maxRequests ?? 5; // 5 submissions per 15 min per IP
    this.duplicateWindowMs = options?.duplicateWindowMs ?? 30 * 1000; // 30 seconds for duplicate clicks

    // Cleanup every 5 minutes if in non-test environment
    if (typeof setInterval !== 'undefined' && process.env.NODE_ENV !== 'test') {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
      if (this.cleanupInterval.unref) {
        this.cleanupInterval.unref();
      }
    }
  }

  /**
   * Checks whether the request from an IP should be limited or if it is an accidental duplicate.
   */
  public check(ip: string, submissionFingerprint?: string): { allowed: boolean; reason?: 'rate_limit' | 'duplicate'; retryAfterSeconds?: number } {
    const now = Date.now();
    const cleanIp = ip || 'unknown';

    let record = this.records.get(cleanIp);
    if (!record) {
      record = { timestamps: [] };
      this.records.set(cleanIp, record);
    }

    // Filter timestamps within sliding window
    record.timestamps = record.timestamps.filter((ts) => now - ts < this.windowMs);

    // Check duplicate submission fingerprint within duplicate window
    if (submissionFingerprint && record.lastHash === submissionFingerprint && record.lastSubmitTime) {
      if (now - record.lastSubmitTime < this.duplicateWindowMs) {
        return {
          allowed: false,
          reason: 'duplicate',
          retryAfterSeconds: Math.ceil((this.duplicateWindowMs - (now - record.lastSubmitTime)) / 1000),
        };
      }
    }

    if (record.timestamps.length >= this.maxRequests) {
      const oldest = record.timestamps[0];
      const retryAfter = Math.ceil((this.windowMs - (now - oldest)) / 1000);
      return {
        allowed: false,
        reason: 'rate_limit',
        retryAfterSeconds: Math.max(1, retryAfter),
      };
    }

    // Record this attempt
    record.timestamps.push(now);
    if (submissionFingerprint) {
      record.lastHash = submissionFingerprint;
      record.lastSubmitTime = now;
    }

    return { allowed: true };
  }

  public reset(): void {
    this.records.clear();
  }

  public cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < this.windowMs);
      if (record.timestamps.length === 0 && (!record.lastSubmitTime || now - record.lastSubmitTime > this.duplicateWindowMs)) {
        this.records.delete(key);
      }
    }
  }
}

export const globalRateLimiter = new InMemoryRateLimiter();
