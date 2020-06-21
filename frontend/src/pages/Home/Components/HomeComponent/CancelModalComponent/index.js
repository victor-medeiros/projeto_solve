import React, { useState, useEffect } from 'react';
import api from '../../../../../service/api';

const CancelModalComponent = ({ display, idService }) => {
    const [windowDisplay, setWindowDisplay] = useState('none');
    const [solution, setSolution] = useState('');

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleCancelService() {
        await api.put(`/service-finish/${idService}`, solution);
    }

    return (
        <div className="modal-container" style={{ display: windowDisplay }}>
            <div className="modal-window">
                <label htmlFor="solution">Informe o cliente o motivo do cancelamento</label>
                <input
                    id="solution"
                    className="modal-input"
                    type="text"
                    onChange={e => setSolution(e.target.value)}
                    value={solution}
                />
                <div className="modal-buttons">
                    <button onClick={() => setWindowDisplay('none')} className="button-cancel">Cancelar</button>
                    <button onClick={handleCancelService} className="button-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default CancelModalComponent;