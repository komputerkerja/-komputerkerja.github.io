const udp = require('dgram')
const { networkInterfaces } = require('os')
// const nets = networkInterfaces()
// const server = udp.createSocket('udp4')
const PORT = 3333
let HOST = '192.168.1.2'

// Client
const client = udp.createSocket('udp4')
client.send('ini dari client', PORT, HOST, err => {
    if(err) throw err
    console.log('client send message sucessfull!')
    client.close()
})
