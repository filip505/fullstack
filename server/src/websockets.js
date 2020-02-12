import WebSocket from 'ws'
import uuid from 'uuid'
import { getDrivers } from './database/db';

class WebSockets extends WebSocket.Server {
    connections = []

    constructor(server) {
        super(server)
        this.on('connection', (ws) => {
            const id = uuid.v1()
            ws.id = id
            console.log('IDIDID', id)
            ws.on('message', (message) => {
                console.log('received: %s', message);
                ws.driverId = message
            });
            ws.on('close', () => {
                
                this.connections = this.connections.filter(ws => {console.log('disconnected', ws.id, id); return ws.id !== id})
            });
            this.connections.push(ws)
        });
        this.sendLocation()
    }

    sendLocation() {
        getDrivers().then(list => {
            const drivers = list.reduce((drivers, driver) => { drivers[driver.id] = driver; return drivers }, {})
            console.log('connection size', this.connections.length)
            for (let ws of this.connections) {
                try {
                    ws.send(JSON.stringify(drivers[ws.driverId].location))
                }catch(e) {
                    this.connections = this.connections.filter(item => ws.id === item.id)
                }
            }
            setTimeout(() => this.sendLocation(), 1000)
        })
    }
}

export default WebSockets




