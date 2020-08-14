import * as FaundaDb from 'faunadb';

const client = new FaundaDb.Client({ secret: process.env.FAUNA_TOKEN });
const q = FaundaDb.query;

export function newUser(id: any) {
	return new Promise((res) => {
		client.query(
			q.Create(
				q.Collection('user'),
				{ data: { userId: id } },
			)
		).then(() => {
			res(true)
		}).catch(() => {
			res(false)
		});
	})
}