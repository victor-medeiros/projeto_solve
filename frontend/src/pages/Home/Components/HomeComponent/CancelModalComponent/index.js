import React, { useState, useEffect } from 'react';
import api from '../../../../../service/api';

const CancelModalComponent = ({ user, display, idService }) => {
    const [windowDisplay, setWindowDisplay] = useState('none');

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleCancelService() {
        await api.put(`/service-cancel/${idService}`);
        setWindowDisplay('none');
    }

    return (
        <div className="modal-container" style={{ display: windowDisplay }}>
            <div className="modal-window">
                <p>Deseja mesmo cancelar este serviço?</p>
                <div className="modal-buttons">
                    <button onClick={() => setWindowDisplay('none')} className="button-cancel">Não</button>
                    <button onClick={handleCancelService} className="button-confirm">Sim</button>
                </div>
            </div>
        </div>
    );
}

export default CancelModalComponent;