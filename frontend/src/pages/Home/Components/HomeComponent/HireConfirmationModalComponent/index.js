import React, { useState, useEffect } from 'react';
import api from '../../../../../service/api';

const HireConfirmationModalComponent = ({ display, idService }) => {
    const [price, setPrice] = useState('');
    const [windowDisplay, setWindowDisplay] = useState('none');

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleHireService() {
        await api.put(`/service-hire/${idService}`);
        setWindowDisplay('none')
    }

    async function handleCancelService() {
        setWindowDisplay('none');
    }

    return (
        <div className="modal-container" style={{display: windowDisplay}}>
            <div className="confirmation-window">
                <p>Ao clicar em contratar você de acordo com os termos e com o preço determinado pelo tecnico. Deseja contratar esse serviço?</p>
                <div className="modal-buttons">
                    <button onClick={handleCancelService} className="button-cancel">Cancelar</button>
                    <button onClick={handleHireService} className="button-confirm">Contratar</button>
                </div>
            </div>
        </div>
    );
}

export default HireConfirmationModalComponent;