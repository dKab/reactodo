import React from 'react';
import './progressbar.css';

export default function ProgressBar(props) {
    const styles = {
        width: props.progress + '%'
    };
    return (<div className="progress-bar">
                <div className="progress-bar__finished" style={styles}></div>
            </div>);
}