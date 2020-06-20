import React from 'react';

const CancelModalComponent = () => {
    return (
        <div className="modal-container">
            <div className="modal-window">
                <label htmlFor="">Informe o cliente o motivo do cancelamento</label>
                <input type="text" />
                <div className="modal-buttons">
                    <button className="button-cancel">Cancelar</button>
                    <button className="button-confirm">Confirmar</button>
                </div>
            </div>
        </div>
    );
}

export default CancelModalComponent;