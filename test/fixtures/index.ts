import { getRepository } from 'typeorm';
import { User } from 'modules/users/entities';

import { USERS, BC_TEMPLATES, PROC_LUTS, TPL_PROCESSES } from './data';
import { BcTemplate, TplProcess, ProcLut } from 'modules/bizcases/entities';

export async function seedData(module) {
  await seedUsers();
  await seedTemplates();
  await seedProcLuts();
  await seedTplProcesses();
}

async function seedUsers() {
  const repository = getRepository(User);

  await repository.save(USERS);
}

async function seedTemplates() {
  const repository = getRepository(BcTemplate);

  await repository.save(BC_TEMPLATES);
}

async function seedProcLuts() {
  const repository = getRepository(ProcLut);

  await repository.save(PROC_LUTS);
}

async function seedTplProcesses() {
  const repository = getRepository(TplProcess);

  await repository.save(TPL_PROCESSES);
}
