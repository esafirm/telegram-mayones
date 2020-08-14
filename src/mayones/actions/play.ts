import { Context } from 'telegraf'
import { newUser, createGameRoom, getGameRoom } from '../stores'

export default async (ctx: Context) => {
	const from = ctx.from
	const groupId = ctx.chat.id
	const user = await newUser(from)

	const room = await getGameRoom(groupId)
	console.log('Room:', room)

	if (room == null) {
		await createGameRoom(ctx.chat.id, user)
	}

	const message = `${from.username} mau memulai game DOTA nih, yang mau ikutan klik /play juga yaa`

	return ctx.reply(message)
}