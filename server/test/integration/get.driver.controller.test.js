import server from '../../src/server'
import supertest from 'supertest'
import { deleteFixtures, createUser } from '../../src/database/fixtures'

describe('get driver', () => {

  let app
  let drivers

  beforeAll(async () => {
    await deleteFixtures()
    app = await server()
    drivers = []
    for (let i = 0; i < 3; i++) {
      const driver = await createUser()
      console.log('driver', driver)
      drivers.push(driver)
    }
  })

  it('get all drivers', async () => {
    
    
   
    const response = await supertest(app)
      .get('/driver')
      .expect(200)

    const driversResponse = JSON.parse(response.res.text)
    expect(driversResponse.length).toBe(drivers.length)
    expect(driversResponse[0].id).toBe(drivers[0].id);
    expect(driversResponse[1].id).toBe(drivers[1].id);
    expect(driversResponse[2].id).toBe(drivers[2].id);
  })

  it('get driver with valid id', async () => {

    const response = await supertest(app)
      .get(`/driver/${drivers[0].id}`)
      .expect(200)

    const driver = JSON.parse(response.res.text)
    expect(driver.id).toBe(drivers[0].id);
  })

  afterAll((done) => {
    app.close(() => {
      console.log('Closed out remaining connections');
      done()
    })
  })
})