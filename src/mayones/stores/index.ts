import * as FaundaDb from 'faunadb';

const Indexes = {
	UserIdIndex: 'UserIdIndex',
	RoomIdIndex: 'RoomIdIndex'
}

const Collections = {
	User: 'user',
	Room: 'room'
}

type Room = {
	roomId: number,
	active: boolean,
	players: Array<string>
}

const client = new FaundaDb.Client({
	secret: process.env.FAUNA_TOKEN,
	timeout: 2000,
});
const q = FaundaDb.query;

export async function newUser(from: any) {
	const isExist = await client.query(
		q.Exists(q.Match(
			q.Index(Indexes.UserIdIndex), from.id
		))
	)
	if (isExist) return Promise.resolve()

	return client.query(
		q.Create(
			q.Collection(Collections.User),
			{ data: from },
		)
	)
}

export async function getGameRoom(roomId: any): Promise<Room> {
	return client.query(
		q.Get(
			q.Match(q.Index(Indexes.RoomIdIndex), roomId)
		)
	) as Promise<Room>
}

export async function createGameRoom(id: any, playerRef: any) {
	return client.query(
		q.Create(
			q.Collection(Collections.Room),
			{
				data: {
					roomId: id,
					active: false,
					players: [playerRef]
				}
			}
		)
	)
}

export async function addPlayerToRoom(roomId: number, playerRef: any) {
	return client.query(
		q.Update(
			q.Select(
				"ref", q.Get(q.Match(
					q.Index(Indexes.RoomIdIndex), roomId
				))
			),
			{
				data: {
					players: playerRef
				}
			}
		)
	)
}