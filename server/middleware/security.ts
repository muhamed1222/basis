
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';

// Rate limiting
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: 'Слишком много запросов с этого IP, попробуйте позже.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Helmet для заголовков безопасности
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Отключаем для совместимости
});

// CORS конфигурация
export const corsConfig = cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-domain.com']
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['X-CSRF-Token'],
});

// CSRF защита
export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

// Middleware для логирования подозрительной активности
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  // Проверяем подозрительные заголовки
  const suspiciousHeaders = ['x-forwarded-for', 'x-real-ip', 'user-agent'];
  const clientInfo = {
    ip: req.ip,
    userAgent: req.get('user-agent'),
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  };

  // Логируем подозрительные запросы
  if (req.url.includes('..') || req.url.includes('<script>') || req.url.includes('sql')) {
    console.warn('Подозрительный запрос:', clientInfo);
  }

  next();
};

// Middleware для проверки размера тела запроса
export const bodySizeLimit = (req: Request, res: Response, next: NextFunction) => {
  const contentLength = parseInt(req.get('content-length') || '0');
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (contentLength > maxSize) {
    return res.status(413).json({ error: 'Размер запроса превышает лимит' });
  }

  next();
};
