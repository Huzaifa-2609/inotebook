import React from 'react'
export const Alert = (props) => {
  const {alert}= props
  return (
    <div style={{marginTop:"55px"}}>
        {alert && <div className={`alert alert-${alert.type}` } role="alert">
            <strong>{alert.type}</strong>:{alert.msg}

        </div>}
    </div>
  )
}
