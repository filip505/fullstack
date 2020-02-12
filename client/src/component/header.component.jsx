import React from 'react'
import style from '../style/header.component.scss'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className={style.container}>
            <Link className={style.title} to="/">KINEXON</Link>
        </div>
    )
}