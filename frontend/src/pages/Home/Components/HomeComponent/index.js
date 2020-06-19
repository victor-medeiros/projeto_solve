import React, { useState, useEffect } from 'react';
import { MdGrade } from 'react-icons/md';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L, { icon } from 'leaflet';
import Tecnico1 from '../../../../assets/tecnico1.png';
import Tecnico2 from '../../../../assets/tecnico2.png';
import './style.css';
import api from '../../../../service/api';

const HomeComponent = (props) => {
    const [request, setRequest] = useState('');
    const [userClicked, setUserClicked] = useState(false);
    const [professional, setProfessional] = useState({});
    const [location, setLocation] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);
        })
    }, []);

    useEffect(() => {
        api.get('/users').then(response =>
            setUsers(response.data.map(user => {
                return {
                    ...user,
                    markerIcon: new L.Icon({
                        iconUrl: user.picture_url,
                        iconSize: [40, 40]
                    })
                };
            })
            ));
    }, []);


    function createMarkerIcon(url) {
        const icon = new L.Icon({
            iconUrl: url,
            iconSize: [40, 40]
        });
    }

    const myIcon = new L.Icon({
        iconUrl: Tecnico1,
        iconSize: [40, 40]
    });
    const myIcon2 = new L.Icon({
        iconUrl: Tecnico2,
        iconSize: [40, 40]
    });

    function handleMarkerClick(user) {
        setUserClicked(true);
        setProfessional(user)
    }

    function handleRequestService() {
        if (request === '') {
            return alert('Digite o serviço');
        }

        const clietn_id = localStorage.getItem('client_id');
        const professional_id = professional.id;

        localStorage.setItem('request', request);
        localStorage.setItem('service-client-id', clietn_id);
        localStorage.setItem('service-professional-id', professional_id);
        return alert('Seriço solicitado!');
    }

    return (
        <div className="home-container" style={{ display: props.display }}>
            <label className="title" htmlFor="request">Descreva o serviço que precisa ser realizado</label>
            <textarea
                type="text"
                id="request"
                placeholder="Ex: Notebook acende o led, mas não inicia ao apertar o botão."
                onChange={e => setRequest(e.target.value)}
                value={request}
            />

            <p className="title">Confirme sua localização no mapa para ver os profissionais</p>
            <div className="map-section">
                <div className="map-container">
                    <Map className="map" center={[-23.6353983, -46.5836981]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {users.map(user => (
                            <Marker
                                key={user.id}
                                position={[user.latitude, user.longitude]}
                                onClick={() => handleMarkerClick(user)}
                                icon={user.markerIcon}
                            />
                        ))}
                        {/* <Marker 
                        position={[ -23.632076, -46.583004 ]}
                        onclick={() => handleMarkerClick(Tecnico1)}
                        icon={myIcon}
                    />
                    <Marker 
                        position={[ -23.636912, -46.584428 ]}
                        onclick={() => handleMarkerClick(Tecnico2)}
                        icon={myIcon2}
                    /> */}
                        <Marker position={[-23.6353983, -46.58442]} />
                    </Map>
                    <button className="button-confirm">Confirmar</button>
                </div>
                <div
                    className="professional-container"
                    style={{
                        display: userClicked ? 'flex' : 'none'
                    }}
                >
                    <img src={professional.picture_url} alt="tecnico" />
                    <div className="professional-content">
                        <div className="name">
                            <p className='professional-title'>{professional.name}</p>
                            <div className="average">
                                <p>4.7</p>
                                <MdGrade size={20} color='#999999' />
                            </div>
                        </div>
                        <p className="professional-description">123 serviços realizados</p>
                        <p className="professional-title">Descrição</p>
                        <p className="professional-description" style={{ overflow: 'auto', maxHeight: 50 }}>{professional.profile_description}</p>
                        <button className="button-solicitar" onClick={handleRequestService}>Solicitar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;