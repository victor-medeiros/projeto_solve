import React, { useState, useEffect } from 'react';
import { MdGrade } from 'react-icons/md';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L, { icon } from 'leaflet';
import './style.css';
import api from '../../../../service/api';
import StartModalComponent from './StartModalComponent';
import FinishModalComponent from './FinishModalComponent';
import CancelModalComponent from './CancelModalComponent';
import RateModalComponent from './RateModalComponent';
import HireConfirmationModalComponent from './HireConfirmationModalComponent';
import { FiStar } from 'react-icons/fi';



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
    const [hireModalComponent, setHireModalComponent] = useState('none');
    const [rate, setRate] = useState(0);
    const [rateModalDisplay, setRateModalDisplay] = useState('none');
    const [starsColor, setStarsColor] = useState([]);

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
                if (currentService.status === 'Concluído') {
                    setRateModalDisplay('flex');
                }
            }
            
        });

        // setStarsColor({
        //     star0: '#4d4d4d', 
        //     star1: '#4d4d4d',
        //     star2: '#4d4d4d',
        //     star3: '#4d4d4d',
        //     star4: '#4d4d4d'
        // });
        setStarsColor([
            '#4d4d4d',
            '#4d4d4d',
            '#4d4d4d',
            '#4d4d4d',
            '#4d4d4d'
        ]);

        setUserStatus(localStorage.getItem('professional'));
    }, []);

    useEffect(() => {
        console.log(service);

        if (service.status === 'Concluído') {
            const user = service.map(data => data.id);
            console.log({id: user})
        }
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
        setProfessional(user);
        localStorage.setItem('professional-picture', user.picture_url);
        localStorage.setItem('professional-name', user.name);
    }

    function handleStarClicked(givenRate) {
        const colorsArray = [];
        for (let i = 0; i < 5; i++) {
            if (i < givenRate){
                colorsArray.push('#FFD335');
                // console.log('amarelo');
            } else {
                // console.log('preto');
                colorsArray.push('#4d4d4d')
            }
            // colors = {...starsColor, [`star${i}`]: '#FFD335'};
        }
        console.log(colorsArray);
        setStarsColor(colorsArray);
        setRate(givenRate);
        console.log(givenRate);
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
    
    // function handleShowModalRate() {
    //     setRateModalComponent('flex');
    // }

    async function handleRateService(){
        const { id } = service;
        await api.put(`/service-rate/${id}`, {rate});
        setRateModalDisplay('none');
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
        setHireModalComponent('flex')
    }

    return (
        <div className="home-container" style={{ display: props.display }}>
            <StartModalComponent idService={service.id} display={startModalComponent} />
            <FinishModalComponent idService={service.id} display={finishModalComponent} />
            <CancelModalComponent idService={service.id} display={cancelModalComponent} />
            <HireConfirmationModalComponent idService={service.id} display={hireModalComponent} />
            
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
                            
                            {userStatus == 1
                                ? service.status === 'Solicitado'
                                    ? (
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <button className="button-cancel" onClick={handleCancelService}>
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
                                                <button className="button-cancel" onClick={handleCancelService}>
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
                                                    <button className="button-cancel" onClick={handleCancelService}>
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
                                        <button className="button-cancel" onClick={handleCancelService}>
                                            Cancelar
                                        </button>
                                    )
                                    : service.status === 'Pronto para iniciar'
                                        ? (
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                                                <p>R$ {service.price}</p>
                                                <button className="button-cancel" onClick={handleCancelService} style={{marginLeft: 30}}>
                                                    Cancelar
                                                </button>
                                                <button onClick={handleHireService} className="button-pick" style={{marginLeft: 10}}>
                                                    Contratar
                                                </button>
                                            </div>
                                        )
                                        : service.status === 'Confirmado' 
                                            ? (
                                                <button className="button-cancel" onClick={handleCancelService}>
                                                    Cancelar
                                                </button>
                                            )
                                            : service.status === 'Concluído'
                                                ? (
                                                    <div className="modal-container" style={{ display: rateModalDisplay }}>
                                                        <div className="modal-window">
                                                            <img src={localStorage.getItem('professional-picture')} alt="Usuário"/>
                                                            <p>Avalie o serviço de {localStorage.getItem('professional-name')}</p>

                                                            <div className="rate-buttons">
                                                                <FiStar size={24} color={starsColor[0]} onClick={() => handleStarClicked(1)} />
                                                                <FiStar size={24} color={starsColor[1]} onClick={() => handleStarClicked(2)} />
                                                                <FiStar size={24} color={starsColor[2]} onClick={() => handleStarClicked(3)} />
                                                                <FiStar size={24} color={starsColor[3]} onClick={() => handleStarClicked(4)} />
                                                                <FiStar size={24} color={starsColor[4]} onClick={() => handleStarClicked(5)} />
                                                            </div>
                                                            
                                                            <button onClick={handleRateService} className="button-confirm">Confirmar</button>
                                                            {/* <div className="modal-buttons">
                                                            </div> */}
                                                        </div>
                                                    </div>
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