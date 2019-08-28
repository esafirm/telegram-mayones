## Core Hours

### Connect Telegram to Netlify 

$ curl --request POST --url https://api.telegram.org/bot\<TELEGRAM BOT TOKEN>/setWebhook --header 'content-type: application/json' --data '{"url": "https://corehours-bot.netlify.com/.netlify/functions/hello-world"}' 