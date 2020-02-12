import { controller, get } from '../helper/controller.decorator'
import { getDrivers, getDriver } from '../database/db'

@controller('/driver')
class DriverController {

  @get()
  async getDrivers(ctx) {
    console.log('drivers id')
    const drivers = await getDrivers()
    ctx.body = drivers.map(driver => ({
      id: driver.id,
      driverName: driver.driverName
    }))
  }

  @get('/:id')
  async getDriver(ctx, next) {
    console.log('id', ctx.params.id)
    const driver = await getDriver(ctx.params.id)
    ctx.body = driver
  }

}

export default new DriverController()