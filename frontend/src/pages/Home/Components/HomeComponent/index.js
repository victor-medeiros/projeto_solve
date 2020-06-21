import React, { useState, useEffect } from 'react';
import { MdGrade } from 'react-icons/md';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L, { icon } from 'leaflet';
import './style.css';
import api from '../../../../service/api';
import StartModalComponent from './StartModalComponent';
import FinishModalComponent from './FinishModalComponent';
import CancelModalComponent from './CancelModalComponent';


const HomeComponent = (props) => {
    const [request, setRequest] = useState('');
    const [userClicked, setUserClicked] = useState(false);
    const [professional, setProfessional] = useState({});
    const [location, setLocation] = useState([0, 0]);
    const [users, setUsers] = useState([]);
    const [serviceInProgress, setServiceInProgress] = useState(false);
    const [service, setService] = useState({});
    const [userStatus, setUserStatus] = useState(0);
    const [price, setPrice] = useState(0);
    const [solution, setSolution] = useState('');
    const [startModalComponent, setStartModalComponent] = useState('none');
    const [finishModalComponent, setFinishModalComponent] = useState('none');
    const [cancelModalComponent, setCancelModalComponent] = useState('none');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLocation([latitude, longitude]);
        })
    }, []);

    useEffect(() => {
        let userId = localStorage.getItem('user_id');
        // if (localStorage.getItem('lastUserLogged') == 1){
        //     userId = localStorage.getItem('professional_id');
        // } else {
        //     userId = localStorage.getItem('client_id');
        // }

        api.get('/service', {
            headers: {
                Authorization: userId
            }
        }).then(response => {
            const currentService = response.data.service[0];
            if (currentService !== undefined) {
                setService(response.data.service[0]);
                setServiceInProgress(true);
            }
            
        });

        setUserStatus(localStorage.getItem('professional'));
        
    }, []);

    async function handleConfirmLocation(){
        await api.get('/users').then(response =>
            setUsers(response.data.map(user => {
                return {
                    ...user,
                    markerIcon: new L.Icon({
                        iconUrl: user.picture_url,
                        iconSize: [40, 40]
                    })
                };
            }))
        );
    }

    function handleMapClick(e) {
        const { lat, lng } = e.latlng;
        setLocation([lat, lng]);
    }

    function handleMarkerClick(user) {
        setUserClicked(true);
        setProfessional(user)
    }

    function handleShowModalStart() {
        setStartModalComponent('flex');
    }

    function handleShowModalFinish() {
        setFinishModalComponent('flex');console.log('Finish Service')
    }

    function handleShowModalCancel() {
        setCancelModalComponent('flex');
    }

    async function handleRequestService() {
        if (request === '') {
            return alert('Digite o serviço');
        }

        const client_id = localStorage.getItem('user_id');
        const professional_id = professional.id;
        console.log(professional_id)
        
        const data = {professional_id, request}
        const response = await api.post('/service', data, {
            headers: {
                Authorization: client_id
            }
        });

        const { id } = response.data;

        setServiceInProgress(true);
        setService({ id });
        setRequest('');

        return alert('Seriço solicitado!');
    }

    async function handleCancelService() {
        setServiceInProgress(false);
        await api.delete(`/service/${service.id}`);
    }

    async function handleConfirmService() {
        const { id } = service;
        await api.put(`/service-confirm/${id}`);
    }

    async function handleHireService() {
        const { id } = service;
        await api.put(`/service-hire/${id}`);
    }

    async function handlePickUpDevice() {
        const { id } = service;
        await api.put(`/service-pick-up-device/${id}`);
    }

    return (
        <div className="home-container" style={{ display: props.display }}>
            <StartModalComponent idService={service.id} display={startModalComponent} />
            <FinishModalComponent idService={service.id} display={finishModalComponent} />
            <CancelModalComponent idService={service.id} display={cancelModalComponent} />
            {!serviceInProgress
                ? userStatus == 0
                ? (
                    <div className="request-container">
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
                                    <Map className="map" center={location} zoom={15} onClick={handleMapClick}>
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
                                        <Marker position={location} />
                                    </Map>
                                    <button className="button-confirm" onClick={handleConfirmLocation}>Confirmar</button>
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
                    )
                    : (
                        <h1>Nenhum Serviço em andamento</h1>
                    )
                
                : (
                    <div className="service-content">
                        <div className="header">
                            <div className="user">
                                <img src={service !== undefined ? service.picture_url : ''} alt="usuario"/>
                                <p>{service !== undefined ? service.user_name : ''}</p>
                            </div>
                            <p id="status" className="begining">{service !== undefined ? service.status : ''}</p>
                        </div>
                        <div className="content">
                            <div className="request-content">
                                <p className="title">Descrição</p>
                                <p className="description" id="request">{service !== undefined ? service.request : ''}</p>
                            </div>
                            
                            {/* <p style={{display: 'none'}} id="price">R$ 300.00</p> */}
                            {userStatus == 1
                                ? service.status === 'Solicitado'
                                    ? (
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <button className="button-cancel" onClick={handleCancelService} style={{display: 'block'}}>
                                                Cancelar
                                            </button>
                                            <button onClick={handleConfirmService} className="button-pick" style={{marginLeft: 10}}>
                                                Confirmar
                                            </button>
                                        </div>
                                    )
                                    : service.status === 'Confirmado'
                                        ? (
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <button className="button-cancel" onClick={handleCancelService} style={{display: 'block'}}>
                                                    Cancelar
                                                </button>
                                                <button onClick={handleShowModalStart} className="button-pick" style={{marginLeft: 10}}>
                                                    Iniciar
                                                </button>
                                            </div>
                                        )
                                        : service.status === 'Pronto para iniciar' 
                                            ? (
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <button className="button-cancel" onClick={handleCancelService} style={{display: 'block'}}>
                                                        Cancelar
                                                    </button>
                                                </div>
                                            )
                                            : service.status === 'Em andamento' 
                                                ? (
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <button onClick={handleShowModalFinish} className="button-pick" style={{marginLeft: 10}}>
                                                            Finalizar
                                                        </button>
                                                    </div>
                                                )
                                                : service.status === 'Concluído'
                                                    ? (<p>R$ {service.price}</p>)
                                                    : (<p></p>)
                                : service.status === 'Solicitado'
                                    ? (
                                        <button className="button-cancel" onClick={handleCancelService} style={{display: 'block'}}>
                                            Cancelar
                                        </button>
                                    )
                                    : service.status === 'Pronto para iniciar'
                                        ? (
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <button className="button-cancel" onClick={handleCancelService} style={{display: 'block'}}>
                                                    Cancelar
                                                </button>
                                                <button onClick={handleHireService} className="button-pick" style={{marginLeft: 10}}>
                                                    Contratar
                                                </button>
                                            </div>
                                        )
                                        : service.status === 'Confirmado' 
                                            ? (
                                                <button className="button-cancel" onClick={handleCancelService} style={{display: 'block'}}>
                                                    Cancelar
                                                </button>
                                            )
                                            : (<p>R$ {service.price}</p>)
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default HomeComponent;