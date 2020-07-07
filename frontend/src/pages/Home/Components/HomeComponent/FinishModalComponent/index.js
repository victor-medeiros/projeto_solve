import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../../../service/api';

const FinishModalComponent = ({display, idService}) => {
    const [windowDisplay, setWindowDisplay] = useState('');
    const [solution, setSolution] = useState('');

    const history = useHistory();

    useEffect(() => {
        setWindowDisplay(display);
    }, [display]);

    async function handleFinishService() {
        const dateTime = getDBFormat(new Date);

        const data = { solution, dateTime, status: 'Em andamento' }
        await api.put(`/service/${idService}`, data);
        setWindowDisplay('none');
        const userId = localStorage.getItem('user_id')
        return history.push(`/home/${userId}`);
    }

    function getDBFormat(date) {
        let formatedDate = '';
        formatedDate = date.getFullYear();
        formatedDate += '-';
        formatedDate += date.getMonth() + 1;
        formatedDate += '-';
        formatedDate += date.getDate();
        formatedDate += ' ';
        formatedDate += date.getHours();
        formatedDate += ':';
        formatedDate += date.getMinutes();
        formatedDate += ':';
        formatedDate += date.getSeconds();

        return formatedDate;
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