import randopeep from 'randopeep'
import { writeFile, readFile } from '../helper/fileSync.helper'
import uuid from 'uuid'

export const createUser = async () => {
  const file = await readFile('./index.get.json', 'utf8')
  var list = JSON.parse(file)
  var data = {
    id: uuid.v1(),
    driverName: randopeep.name(),
    driverCityOrigin: randopeep.address.city(),
    driverLanguage: ['de', 'en', 'nl', 'fr', 'es', 'ar'][Math.floor(Math.random() * 7)],
    driverPhone: randopeep.address.phone(),
    driverGender: ['male', 'female'][Math.floor(Math.random() * 2)],
    driverInfo: randopeep.corporate.catchPhrase(0),
    carMake: randopeep.corporate.name('large', 0),
    kmDriven: Math.floor(Math.random() * 100000),
    location: randopeep.address.geo()
  }
  list.push(data);
  await writeFile("./index.get.json", JSON.stringify(list));
  return data
}

export const deleteFixtures = async () => {
  await writeFile("./index.get.json", JSON.stringify([]));
}

export const createFixtures = async () => {
  await deleteFixtures()
  // mock 10 users
  for (let i = 0; i < 10; i++) {
    await createUser()
  }
}
