import { Context } from 'telegraf'
import { newUser, createGameRoom } from '../stores'

export default async (ctx: Context) => {
	const from = ctx.from
	const newUserRes = await newUser(from)
	const res = await createGameRoom(ctx.chat.id)

	console.log('Fauna response: ', newUserRes)
	console.log('Fauna response: ', res)

	const message = `${from.username} mau memulai game DOTA nih, yang mau ikutan klik /play juga yaa`

	return ctx.reply(message)
}