import React from 'react'
import { connect } from 'react-redux'



const Alert = ({ alert }) => {


    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>

                <i className='fas fa-into-circle' />{alert.msg}
            </div>
        )
    )
}
// mapped to props
const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps)(Alert)
