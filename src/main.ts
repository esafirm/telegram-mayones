
exports.handler = function (_event, _context, callback) {

  console.log(_event)
  console.log(_context)

  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
};