import { readFile } from '../helper/fileSync.helper'

const db = {
    getDriver: async (id) => {
        const file = await readFile('./index.get.json', 'utf8')
        const list = JSON.parse(file)
        return list.find(driver => driver.id === id)
    },
    getDrivers: async () => {
        const file = await readFile('./index.get.json', 'utf8')
        const list = JSON.parse(file)
        return list
    }
}

export const getDrivers = db.getDrivers
export const getDriver = db.getDriver 