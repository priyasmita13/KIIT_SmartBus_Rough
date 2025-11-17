import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/user.model.js';
import { verifyPassword, hashPassword } from '../utils/crypto.js';
import config from '../config.js';
import { errors } from '../lib/errors.js';

const signupSchema = z.object({
  email: z.string().email().refine((email) => email.endsWith('@kiit.ac.in'), {
    message: 'Please use your official KIIT email ID'
  }),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['STUDENT', 'DRIVER', 'ADMIN']).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

export async function signup(input: SignupInput) {
  const data = signupSchema.parse(input);
  const exists = await User.findOne({ email: data.email });
  if (exists) throw errors.conflict('Email already in use');

  const passwordHash = await hashPassword(data.password);
  const user = await User.create({
    email: data.email,
    passwordHash,
    name: data.name,
    role: data.role || 'STUDENT',
  });
  return sanitize(user);
}

const loginSchema = z.object({ 
  email: z.string().email().refine((email) => email.endsWith('@kiit.ac.in'), {
    message: 'Please use your official KIIT email ID'
  }), 
  password: z.string().min(8) 
});
export type LoginInput = z.infer<typeof loginSchema>;

export function signTokens(payload: { sub: string; role: string }) {
  const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: config.jwtAccessTtl } as jwt.SignOptions);
  const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshTtl } as jwt.SignOptions);
  return { accessToken, refreshToken };
}

export async function login(input: LoginInput) {
  const { email, password } = loginSchema.parse(input);
  const user = await User.findOne({ email });
  if (!user) throw errors.unauthorized('Invalid credentials');
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw errors.unauthorized('Invalid credentials');
  const tokens = signTokens({ sub: user.id, role: user.role });
  return { user: sanitize(user), ...tokens };
}

export function sanitize(user: any) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}
