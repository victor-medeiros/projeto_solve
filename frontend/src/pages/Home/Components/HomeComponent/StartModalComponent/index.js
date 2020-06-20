import React, {useState} from 'react';
import './style.css';
import api from '../../../../../service/api';

const StartModalComponent = ({ display, serviceId }) => {
    const [price, setPrice] = useState(0);
    const [windowDisplay, setWindowDisplay] = useState(display);

    async function handleStartService() {
        if (isNaN(price)){
            return alert('Digite um valor numérico');
        }
        
        await api.put(`/service-start/${serviceId}`, price);
    }

    async function handleCancelService() {
        setWindowDisplay('none');
    }

    return (
        <div className="modal-container" style={{display: windowDisplay}}>
            <div className="modal-window">
                <label htmlFor="">Preço do serviço</label>
                <input
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