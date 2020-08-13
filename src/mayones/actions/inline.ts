import { Context } from 'telegraf'

export default async (ctx: Context) => {
	const answer = [{
		type: 'article',
		title: 'Aing lagi testing',
		id: 'loading',
		input_message_content: {
			message_text: 'Gitu loooo'
		}
	}]
	return ctx.answerInlineQuery(answer)
}