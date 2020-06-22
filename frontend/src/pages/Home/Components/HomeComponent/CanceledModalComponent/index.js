import React, { useState, useEffect } from 'react';
import api from '../../../../../service/api';

const CancelModalComponent = ({ user, display, idService }) => {
    const [windowDisplay, setWindowDisplay] = useState('none');

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleDeleteService() {
        await api.delete(`/service/${idService}`);
        setWindowDisplay('none');
    }

    return (
        <div className="modal-container" style={{ display: windowDisplay }}>
            <div className="modal-window">
                <p>{user} cancelou o serviço.</p>
                <div className="modal-buttons">
                    <button onClick={handleDeleteService} className="button-confirm">Ok</button>
                </div>
            </div>
        </div>
    );
}

export default CancelModalComponent;