/**
 * Common FQL
 */

import * as FaundaDb from 'faunadb';

const q = FaundaDb.query;

export const FQL = {
  create(collection: string, object: any): FaundaDb.Expr {
    return q.Create(q.Collection(collection), object);
  },

  find(index: string, match: any): FaundaDb.Expr {
    return q.Get(q.Match(q.Index(index), match));
  },

  findFirst(index: string): FaundaDb.Expr {
    return q.Get(q.Match(q.Index(index)));
  },

  updateBy(
    updateConfig: { index: string; match: any },
    payload: any,
  ): FaundaDb.Expr {
    const { index, match } = updateConfig;
    return q.Update(
      q.Select('ref', q.Get(q.Match(q.Index(index), match))),
      payload,
    );
  },
};
