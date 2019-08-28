import * as data from "./data";
import axios from 'axios'

const event = JSON.parse("{\r\n  \"path\": \"\/.netlify\/functions\/hello-world\",\r\n  \"httpMethod\": \"POST\",\r\n  \"headers\": {\r\n    \"accept-encoding\": \"gzip\",\r\n    \"client-ip\": \"91.108.6.102\",\r\n    \"content-length\": \"498\",\r\n    \"content-type\": \"application\/json\",\r\n    \"via\": \"https\/1.1 Netlify[ee5eb91d-6a31-4e96-87eb-2cc4d21a4ac1] (ApacheTrafficServer\/7.1.7)\",\r\n    \"x-bb-ab\": \"0.204906\",\r\n    \"x-bb-client-request-uuid\": \"ee5eb91d-6a31-4e96-87eb-2cc4d21a4ac1-1213055\",\r\n    \"x-bb-ip\": \"91.108.6.102\",\r\n    \"x-bb-loop\": \"1\",\r\n    \"x-country\": \"NL\",\r\n    \"x-forwarded-for\": \"91.108.6.102\",\r\n    \"x-forwarded-proto\": \"https\"\r\n  },\r\n  \"queryStringParameters\": {},\r\n  \"body\": {\r\n    \"update_id\": 218161531,\r\n    \"message\": {\r\n      \"message_id\": 2,\r\n      \"from\": {\r\n        \"id\": 203544816,\r\n        \"is_bot\": false,\r\n        \"first_name\": \"Esa\",\r\n        \"last_name\": \"\",\r\n        \"username\": \"esafirm\",\r\n        \"language_code\": \"en\"\r\n      },\r\n      \"chat\": {\r\n        \"id\": 203544816,\r\n        \"first_name\": \"Esa\",\r\n        \"last_name\": \"\",\r\n        \"username\": \"esafirm\",\r\n        \"type\": \"private\"\r\n      },\r\n      \"date\": 1566964238,\r\n      \"text\": \"\/start\",\r\n      \"entities\": [\r\n        {\r\n          \"offset\": 0,\r\n          \"length\": 6,\r\n          \"type\": \"bot_command\"\r\n        }\r\n      ]\r\n    }\r\n  },\r\n  \"isBase64Encoded\": false\r\n}")

const handleFunction = async (_event, context) => {

  const token = process.env.TELEGRAM_TOKEN

  console.log('token', token)
  console.log('event', event)
  console.log('context', context)

  const body = event.body as data.RootObject
  const url = `https://api.telegram.org/bot${token}/sendMessage`

  console.log('Send url', url)

  const response = await axios.post(url, {
    text: 'Ya',
    chat_id: body.message.chat.id
  })
  console.log('res', response)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Harusnya sukses` })
  }
};

exports.handler = handleFunction

