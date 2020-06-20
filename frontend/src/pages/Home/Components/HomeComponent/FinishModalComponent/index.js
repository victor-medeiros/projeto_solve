import React from 'react';

const FinishModalComponent = () => {
    return (
        <div className="modal-container">
            <div className="finish-modal-window">
                <label htmlFor="">Informe o serviço que foi ralizado</label>
                <input className="finish-input" type="text" placeholder="Ex: Troca do notebook painel tn para ips" />
                <div className="modal-buttons">
                    <button className="button-cancel">Cancelar</button>
                    <button className="button-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default FinishModalComponent;