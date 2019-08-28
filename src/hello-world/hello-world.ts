
exports.handler = async (event, context) => {

  const token = process.env.TELEGRAM_TOKEN

  console.log('token', token)
  console.log('event', event)
  console.log('context', context)

  try {
    const subject = event.queryStringParameters.name || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
