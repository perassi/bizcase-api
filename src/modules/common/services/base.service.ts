import { FindManyOptions } from 'typeorm';
import { fromPairs } from 'lodash';

export abstract class BaseService {
  protected getFindAllQuery(query: any) {
    const { page, skip, limit, sort, ...where } = query;
    return {
      skip: skip > 0 ? skip : (page - 1) * limit,
      take: limit,
      order: sort ? fromPairs([sort]) : {},
      where,
    };
  }
}
