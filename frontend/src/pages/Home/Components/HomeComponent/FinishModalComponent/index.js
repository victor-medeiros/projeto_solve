import React, { useState, useEffect } from 'react';
import api from '../../../../../service/api';

const FinishModalComponent = ({display, idService}) => {
    const [windowDisplay, setWindowDisplay] = useState('');
    const [solution, setSolution] = useState('');

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleFinishService() {
        const dateTime = new Date;

        const data = { solution, dateTime }
        await api.put(`/service-finish/${idService}`, data);
        setWindowDisplay('none');
    }

    return (
        <div className="modal-container" style={{ display: windowDisplay }}>
            <div className="finish-modal-window">
                <label htmlFor="">Informe o serviço que foi ralizado</label>
                <input
                    className="modal-input finish-input"
                    type="text"
                    onChange={e => setSolution(e.target.value)}
                    value={solution}
                />
                <div className="modal-buttons">
                    <button onClick={() => setWindowDisplay('none')} className="button-cancel">Cancelar</button>
                    <button onClick={handleFinishService} className="button-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default FinishModalComponent;