const udp = require('dgram')
const server = udp.createSocket('udp4')
const PORT = 3333
const HOST = '127.0.0.1'

// Server
server.on('listening', () => console.log('server listening'))
server.on('message', msg => console.log(`server recived message: ${msg}`))
server.bind(PORT,HOST)

// Client
const client = udp.createSocket('udp4')
client.send('ini dari client', PORT, HOST, err => {
    if(err) throw err
    console.log('client send message sucessfull!')
    client.close()
})
