import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import api from '../../../../../service/api';

const StartModalComponent = ({ display, idService }) => {
    const [price, setPrice] = useState('');
    const [windowDisplay, setWindowDisplay] = useState('none');

    const history = useHistory();

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleStartService() {
        if (isNaN(price)){
            return alert('Digite um valor numérico');
        }

        await api.put(`/service/${idService}`, {price, status: 'Confirmado'});
        setWindowDisplay('none');
        const userId = localStorage.getItem('user_id')
        return history.push(`/home/${userId}`);
    }

    async function handleCancelService() {
        setWindowDisplay('none');
    }

    return (
        <div className="modal-container" style={{display: windowDisplay}}>
            <div className="modal-window">
                <label htmlFor="">Preço do serviço</label>
                <input
                    className="modal-input"
                    type="text"
                    placeholder="Ex: 300.00"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                />
                <div className="modal-buttons">
                    <button onClick={handleCancelService} className="button-cancel">Cancelar</button>
                    <button onClick={handleStartService} className="button-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default StartModalComponent;