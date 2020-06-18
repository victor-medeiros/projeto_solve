import React, { useState, useEffect } from 'react';
import { MdGrade } from 'react-icons/md';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Tecnico1 from '../../../../assets/tecnico1.png';
import './style.css'

const HomeComponent = (props) => {
    const [userClicked, setUserClicked] = useState(false);
    
    return (
        <div className="home-container" style={{display: props.display}}>
        <label className="title" htmlFor="request">Descreva o serviço que precisa ser realizado</label>
        <textarea type="text" id="request" placeholder="Ex: Notebook acende o led, mas não inicia ao apertar o botão." />

        <p className="title">Confirme sua localização no mapa para ver os profissionais</p>
        <div className="map-section">
            <div className="map-container">
                <Map className="map" center={[ -23.6353983, -46.5836981 ]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker 
                        position={[ -23.6353983, -46.5836981 ]}
                        onclick={() => setUserClicked(true)}
                    />
                </Map>
                <button className="button-confirm">Confirmar</button>
            </div>
            <div 
                className="professional-container" 
                style={{
                display: userClicked ? 'flex' : 'none'
                }}
            >
                <img src={Tecnico1} alt="tecnico"/>
                <div className="professional-content">
                    <div className="name">
                        <p className='professional-title'>José</p>
                        <div className="average">
                            <p>4.7</p>
                            <MdGrade size={20} color='#999999' />
                        </div>
                    </div>
                    <p className="professional-description">123 serviços realizados</p>
                    <p className="professional-title">Descrição</p>
                    <p className="professional-description" style={{overflow: 'auto', maxHeight: 50}}>Sou técnico em informática desde 2010, com experiência em computadores e notebooks</p>
                    <button className="button-solicitar">Solicitar</button>
                </div>
            </div>
        </div>
    </div>  
    );
}

export default HomeComponent;