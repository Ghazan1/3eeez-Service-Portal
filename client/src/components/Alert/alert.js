import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => {
    return <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
})

alert.propTypes = {
    alert: PropTypes.array.isRequired,
}

const mapStateToProp = state => ({
    alerts: state.alert
})

export default connect(mapStateToProp)(Alert);