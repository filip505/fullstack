import { getDrivers } from "./database/db"
import randopeep from 'randopeep'
import { writeFile } from './helper/fileSync.helper'

class Worker {

    start(time) {
        this.updateLocaton().then(() => {
            setTimeout(() => this.start(time), time)
        })

    }

    async updateLocaton() {
        const drivers = await getDrivers()
        for (let driver of drivers) {
            driver.location = randopeep.address.geo()
        }
        await writeFile("./index.get.json", JSON.stringify(drivers));
        console.log('change')
    }
}

export default Worker