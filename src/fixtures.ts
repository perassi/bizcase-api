import { getRepository } from 'typeorm';

import { User } from 'modules/users/entities';

export const setupFixtures = async () => {
  // Add default user john@doe.com:s3cr3t
  const userRepository = getRepository(User);
  const defaultUser = await userRepository.findOne({ email: 'john@doe.com' });
  if (!defaultUser) {
    const user = new User({
      email: 'john@doe.com',
      password: 's3cr3t',
    });
    await userRepository.save(user);
  }
};
