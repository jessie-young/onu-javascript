const onu = require('@onuhq/node')

const onuClient = new onu.OnuClient({
  onuPath: __dirname,
  apiKey: 'YOUR_API_KEY',  // <-- Add your API key here.
})

onuClient.initializeHttpServer()

// or
// module.exports = {
//   default: onuClient,
// }
