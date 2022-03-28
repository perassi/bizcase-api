import { Injectable } from '@nestjs/common';

import { hash, verify } from 'lib/passwordHasher';

@Injectable()
export class PasswordHasherService {
  hash(password: string) {
    return hash(password);
  }

  verify(password: string, hashedPassword: string) {
    return verify(password, hashedPassword);
  }
}
