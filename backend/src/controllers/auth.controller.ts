import type { Request, Response } from 'express';
import { login, signup, signTokens } from '../services/auth.service.js';
import config from '../config.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const baseCookieOptions = {
  httpOnly: true,
  secure: config.isProd,
  sameSite: config.isProd ? 'strict' : 'lax',
} as const;

// In production, set cookie domain if provided; in dev, omit to avoid cross-site issues on localhost
const cookieOptions = config.isProd && config.cookieDomain
  ? { ...baseCookieOptions, domain: config.cookieDomain }
  : baseCookieOptions;

export async function postSignup(req: Request, res: Response) {
  const user = await signup(req.body);
  const tokens = signTokens({ sub: user.id, role: user.role });
  res
    .cookie('refreshToken', tokens.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 3600 * 1000 })
    .status(201)
    .json({ user, accessToken: tokens.accessToken });
}

export async function postLogin(req: Request, res: Response) {
  const { user, accessToken, refreshToken } = await login(req.body);
  res
    .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 3600 * 1000 })
    .json({ user, accessToken });
}

export async function postLogout(_req: Request, res: Response) {
  res.clearCookie('refreshToken', cookieOptions).status(204).send();
}

export async function postRefresh(req: Request, res: Response) {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) return res.status(401).json({ error: { message: 'Unauthorized', status: 401 } });
  try {
    const payload = jwt.verify(token, config.jwtRefreshSecret) as { sub: string; role: string };
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: { message: 'Unauthorized', status: 401 } });
    const { accessToken } = signTokens({ sub: user.id, role: user.role });
    res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch {
    return res.status(401).json({ error: { message: 'Unauthorized', status: 401 } });
  }
}


