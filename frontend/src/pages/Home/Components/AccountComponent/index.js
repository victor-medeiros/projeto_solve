import React from 'react';
import Usuario from '../../../../assets/usuario1.png';
import './style.css';
const AccountComponent = (props) => {
    return (
        <div className="account-container" style={{display: props.display}}>
            <div className="header">
                <h2>Minha conta</h2>
                <p className="edit">Editar</p>
            </div>
            <div className="user-content">
                <div className="image">
                    <img src={Usuario} alt="Usuario"/>
                </div>

                <label className="title" htmlFor="name">Nome</label>
                <input className="input" type="text" id="name"/>

                <label className="title" htmlFor="email">Nome</label>
                <input className="input" type="text" id="email"/>

                <div className="password-container">
                    <div>
                        <label className="title" htmlFor="password">Senha</label>
                        <input className="password-input" type="text" id="password"/>
                    </div>
                    <div>
                        <label className="title" htmlFor="password">Confirmação</label>
                        <input className="password-input" type="text" id="confirm-password"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountComponent;