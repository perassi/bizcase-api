import { pbkdf2Sync, randomBytes } from 'crypto';

const iterations = 1000;
const keylen = 64;
const digest = 'sha512';

export const genSalt = (saltRounds: number) => {
  return randomBytes(saltRounds).toString('hex');
};

export const hash = (password: string, saltRounds: number = 16) => {
  const salt = genSalt(saltRounds);
  const hashed = _hashWithSalt(password, salt);
  return [salt, hashed].join('$');
};

export const verify = (password: string, hashedPassword: string) => {
  if (!password || !hashedPassword) {
    return false;
  }
  const [salt, hashed] = hashedPassword.split('$');
  return _hashWithSalt(password, salt) === hashed;
};

const _hashWithSalt = (password: string, salt: string) => {
  return pbkdf2Sync(password, salt, iterations, keylen, digest).toString(`hex`);
};
