import React from 'react';
import '../ProgressBar.css';

const ProgressBar = ({label, percentage, width, bytes }:{ label: string, percentage: number, width: number, bytes: number }) => {

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      setValue(percentage * width);
    }, [percentage, width]);
    return (
        <div className="bar-container">
            <h3>{label}</h3>
            <div className="bar" style={{width: `${width}px`}}> 
                 <span className="progress-start-cap"/>
                <span 
                    className="progress" 
                    style={{ width: `${value + 25}px`}} data-bytes={bytes} data-language={label}/>
                <h5 className="bar-percent">{`${Math.ceil((percentage * 100))}%`}</h5>
            </div>            
        </div>
    )
};

export default ProgressBar