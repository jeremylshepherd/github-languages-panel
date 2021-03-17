import React from 'react'
import '../Spinner.css'

function Spinner() {
    return (
      <span className="spinner-container">
          <i className="fab fa-github fa-3x" />
          <i className="fas fa-spinner fa-spin fa-7x"/>
      </span>
    );
}

export default Spinner
