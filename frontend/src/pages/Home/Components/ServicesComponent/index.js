import React from 'react';
import Usuario from '../../../../assets/tecnico1.png';
import './style.css';

const ServieComponent = (props) => {
    return (
        <div className="service-container" style={{display: props.display}}>
            <div className="service-content">
                <div className="header">
                    <div className="user">
                        <img src={Usuario} alt="usuario"/>
                        <p>Nome</p>
                    </div>
                    <p id="status" className="begining">Status</p>
                </div>
                <div className="content">
                    <div className="request-content">
                        <p className="title">Descrição</p>
                        <p className="description" id="request">O ledacende, mas o notebook não liga</p>
                    </div>
                    <p style={{display: 'none'}} id="price">R$ 300.00</p>
                    <button className="button-cancel" style={{display: 'block'}}>
                        Cancelar
                    </button>
                    <button className="button-pick" style={{display: 'none'}}>
                        Já retirei
                    </button>
                </div>
            </div>
            
            <p className="title" style={{color: '#999'}}>Já Realizados</p>
            <div className="service-content">
                <div className="header">
                    <div className="user">
                        <img src={Usuario} alt="usuario"/>
                        <p>Nome</p>
                    </div>
                    <p id="status" className="begining">Status</p>
                </div>
                <div className="content">
                    <div className="request-content">
                        <p className="title">Descrição</p>
                        <p className="description" id="request">O ledacende, mas o notebook não liga</p>
                    </div>
                    <p style={{display: 'block'}} id="price">R$ 300.00</p>
                    <button className="button-cancel" style={{display: 'none'}}>
                        Cancelar
                    </button>
                    <button className="button-pick" style={{display: 'none'}}>
                        Já retirei
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServieComponent;