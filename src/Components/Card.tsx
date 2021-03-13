import React from 'react'
import '../Card.css'

function Card(props: any) {
    return (
        <div className="language_card">
            {props.children}
        </div>
    )
}

export default Card