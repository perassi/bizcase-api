import { getRepository } from 'typeorm';

import { User } from 'modules/users/entities';

export const setupFixtures = async () => {
  // Add default user bc@clearprism.com:s3cr3t
  const userRepository = getRepository(User);
  const defaultUser = await userRepository.findOne({ email: 'bc@clearprism.com' });
  if (!defaultUser) {
    const user = new User({
      email: 'bc@clearprism.com',
      password: 's3cr3t',
    });
    await userRepository.save(user);
  }
};
