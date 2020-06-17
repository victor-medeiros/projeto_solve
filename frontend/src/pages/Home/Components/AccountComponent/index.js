import React, { useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Usuario from '../../../../assets/usuario1.png';
import './style.css';
const AccountComponent = (props) => {
    const [edit, setEdit] = useState(false);

    const professional = true;

    function handleEditClick() {
        setEdit(edit ? false : true);
    }

    return (
        <div className="account-container" style={{display: props.display}}>
            <div className="account-header">
                <h2>Minha conta</h2>
                <p onClick={handleEditClick} className="edit">{!edit ? 'Editar' : 'Salvar'}</p>
            </div>
            <div className="user-content">
                <div className="image">
                    <img src={Usuario} alt="Usuario"/>
                </div>

                <label className="title" htmlFor="name">Nome</label>
                <input  disabled={edit ? false : true} className="input" type="text" id="name"/>

                <label className="title" htmlFor="email">E-mail</label>
                <input  disabled={edit ? false : true} className="input" type="text" id="email"/>

                <div className="password-container">
                    <div>
                        <label className="title" htmlFor="password">Senha</label>
                        <input  disabled={edit ? false : true} className="password-input" type="text" id="password"/>
                    </div>
                    <div>
                        <label className="title" htmlFor="confirm-password">Confirmação</label>
                        <input  disabled={edit ? false : true} className="password-input" type="text" id="confirm-password"/>
                    </div>
                </div>
                
                
                <div style={{display: !professional ? 'none' : 'block', display: 'flex', flexDirection: 'column'}}>
                    <label className="title" htmlFor="profile-description">Descrição do perfil</label>
                    <textarea 
                        disabled={edit ? false : true}
                        id="profile-description"
                        className="account-profile-description"
                        value=""
                    />
                    
                    <div className="map-section-account">
                        <div className="map-header">
                            <p className="title">Localização</p>
                            <p className="edit">Atualizar</p>
                        </div>
                        <Map className="map-account" center={[ -23.6353983, -46.5836981 ]} zoom={15}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker 
                                position={[ -23.6353983, -46.5836981 ]}
                            />
                        </Map>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountComponent;