import * as FaundaDb from 'faunadb';

const client = new FaundaDb.Client({ secret: process.env.FAUNA_TOKEN });
const q = FaundaDb.query;

export async function newUser(from: any) {
	return client.query(
		q.Create(
			q.Collection('user'),
			{ data: from },
		)
	)
}

export async function createGameRoom(id: any) {
	return client.query(
		q.Create(
			q.Collection('room'),
			{
				telegramGroupId: id,
				active: true
			}
		)
	)
}