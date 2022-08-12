const udp = require('dgram')
const { networkInterfaces } = require('os')
const nets = networkInterfaces()
const server = udp.createSocket('udp4')
const PORT = 3333
let HOST = '127.0.0.1'

const res = Object.create(null)
for(const name of Object.keys(nets)){
    for(const net of nets[name]){
        if(net.family === 'IPv4' && !net.internal){
            if(!res[name]){
                res[name]=[]
                if(name=='Wi-Fi') {
                    HOST = net.address
                    console.log(net.address)
                    console.log(name)
                }
            }
            res[name].push(net.address)
        }
    }
}

// Server
server.on('listening', () => console.log('server listening'))
server.on('message', msg => console.log(`server recived message: ${msg}`))
server.bind(PORT,HOST)

// Client
// const client = udp.createSocket('udp4')
// client.send('ini dari client', PORT, HOST, err => {
//     if(err) throw err
//     console.log('client send message sucessfull!')
//     client.close()
// })
