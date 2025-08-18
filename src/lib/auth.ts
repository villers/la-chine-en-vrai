import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface AuthUser {
  id: string;
  username: string;
  role: 'admin';
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

export function validateCredentials(username: string, password: string): AuthUser | null {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return {
      id: '1',
      username: ADMIN_USERNAME,
      role: 'admin'
    };
  }
  return null;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Vérifier le header Authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Vérifier les cookies
  const cookie = request.cookies.get('admin-token');
  return cookie?.value || null;
}

export function isAuthenticated(request: NextRequest): AuthUser | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  
  return verifyToken(token);
}