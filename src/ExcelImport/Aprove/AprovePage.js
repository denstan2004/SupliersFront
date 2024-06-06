import React, { useState, useEffect } from 'react';
import './AprovePage.css'
function AprovePage ({onClose, onSubmit, text}){
return(
    <div className="aprove-container">
        <div>{text}</div>
        <div className="aprove-buttons">
            <button onClick={onSubmit} className="aprove-submit">Так</button>
            <button onClick={onClose} className="decline-submit">Ні</button>

        </div>
    </div>
)
}

export default AprovePage;

