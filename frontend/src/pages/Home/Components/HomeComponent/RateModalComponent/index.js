import React, { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';

const RateModalComponent = ({ idService, user, display}) => {
    const [windowDisplay, setWindowDisplay] = useState('');
    const [rate, setRate] = useState(0);

    useEffect(() => {
        setWindowDisplay(display);
    }, []);

    function handleRateService() {
        console.log(rate);
        console.log(idService)
        setWindowDisplay('none');
    }


    return (
        <div className="modal-container" style={{ display: windowDisplay }}>
            <div className="modal-window">
                <img src={user.picture} alt="Usuário"/>
                <p>Avalie o serviço de {user.name}</p>

                <div className="rate-buttons">
                    <FiStar onClick={() => setRate(1)} />
                    <FiStar onClick={() => setRate(2)} />
                    <FiStar onClick={() => setRate(3)} />
                    <FiStar onClick={() => setRate(4)} />
                    <FiStar onClick={() => setRate(5)} />
                </div>
                
                <button onClick={handleRateService} className="button-confirm">Confirmar</button>
                {/* <div className="modal-buttons">
                </div> */}
            </div>
        </div>
    );
}

export default RateModalComponent;