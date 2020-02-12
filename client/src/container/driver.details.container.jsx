import React from 'react'
import axios from 'axios'
import style from '../style/driver.details.container.scss'
import env from '../env'

class DriverDetailsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { driver: null }
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        await this.fetchDriver(id)
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props.match.params
        if (prevProps.match.params.id !== id) {
            this.closeLiveLocation()
            await this.fetchDriver(id);
        }
    }

    componentWillUnmount() {
        this.closeLiveLocation()
    }

    closeLiveLocation() {
        try {
            this.ws.close();
        } catch (e) { }
    }

    async fetchDriver(id) {
        this.setState({ driver: null, location: null })
        const res = await axios.get(`${env.server}/driver/${id}`)
        this.setState({ driver: res.data })
    }

    startTrackingLiveLocation(id) {
        this.ws = new WebSocket(env.websocket);
        this.ws.onopen = () => {
            this.setState({ tracking: true })
            this.ws.send(id)
        }
        this.ws.onmessage = (data) => {
            this.setState({ location: JSON.parse(data.data) })
        }
    }

    render() {
        const driver = this.state.driver
        if (driver) {
            return (
                <div className={style.container}>
                    <div className={style.card}>
                        <div className={style.item}><b>Name:</b>  {driver.driverName}</div>
                        <div className={style.item}><b>Id:</b> {driver.id}</div>
                        <div className={style.item}><b>City:</b>  {driver.driverCityOrigin}</div>
                        <div className={style.item}><b>Language:</b>  {driver.driverLanguage}</div>
                        <div className={style.item}><b>Phone:</b>  {driver.driverPhone}</div>
                        <div className={style.item}><b>Gender:</b>  {driver.driverGender}</div>
                        <div className={style.item}><b>km:</b>  {driver.kmDriven}</div>
                        <div className={style.footer}>
                            <div className={style.button} onClick={() => this.startTrackingLiveLocation(driver.id)}>TRACK LIVE LOCATION</div>
                        </div>
                        {this.state.location &&
                            <div>
                                <div className={style.item}><b>Longitude: ‎</b>{this.state.location[0]}</div>
                                <div className={style.item}><b>Latitude‎: </b>{this.state.location[1]}</div>
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return (
            <div className={style.container}>loading...</div>
        )
    }
}

export default DriverDetailsContainer