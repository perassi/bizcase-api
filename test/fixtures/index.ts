
import * as path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist';
import { createConnection, getRepository } from 'typeorm';

export const loadFixtures = async (connection, fixturesPath: string) => {
  try {
    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity: any = await builder.build(fixture);
      await getRepository(entity.constructor.name).save(entity);
    }
  } catch (err) {
    throw err;
  }
};
