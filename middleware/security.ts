
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimit {
  private store: RateLimitStore = {};
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private cleanupInterval: NodeJS.Timeout;

  constructor(maxRequests = 100, windowMs = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // Автоматическая очистка каждые 5 минут
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.store = {};
  }

  check(identifier: string): boolean {
    const now = Date.now();
    const record = this.store[identifier];

    if (!record || now > record.resetTime) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs
      };
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

export const rateLimit = new RateLimit();

// CORS configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// CSP headers
export const cspHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://apis.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.example.com",
    "frame-ancestors 'none'",
    "form-action 'self'"
  ].join('; ')
};
