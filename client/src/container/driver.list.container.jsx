import React from 'react'
import axios from 'axios'
import style from '../style/driver.list.container.scss'
import env from '../env'

class DashboardContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            drivers: []
        }
    }

    async componentDidMount() {
        const drivers = await axios.get(`${env.server}/driver`)
        this.setState({ drivers: drivers.data })
    }

    renderHeader(){
        return (
            <div className={style.header}>DRIVERS</div>
        )
    }

    renderItem(driver) {
        const { history } = this.props
        return (
            <div key={driver.id} className={style.item}onClick={() => { history.push(`/${driver.id}`) }}>{driver.driverName}</div>
        )
    }

    render() {
        const { drivers } = this.state
        return (
            <div className={style.container}>
                {this.renderHeader()}
                {drivers.map(driver => this.renderItem(driver))}
            </div>
        )
    }
}

export default DashboardContainer