#!/usr/bin/env bash

if [ -z $TELEGRAM_TOKEN ]
then
	echo "Please specify TELEGRAM_TOKEN first"
	exit 1
fi

curl --request POST --url "https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook" --header 'content-type: application/json' --data '{"url": "https://corehours-bot.netlify.app/.netlify/functions/mayones"}'
