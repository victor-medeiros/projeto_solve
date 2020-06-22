import React, {useState, useEffect} from 'react';
import Usuario from '../../../../assets/tecnico1.png';
import './style.css';
import api from '../../../../service/api';

const ServieComponent = (props) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const professional = localStorage.getItem('professional');
        const id = localStorage.getItem('user_id');
        
        try {
            api.post(`/services/${id}`, {professional}).then(response => {
                setServices(response.data);
            })
        } catch (error) {
            return error;
        }
    }, []);

    return (
        <div className="service-container" style={{display: props.display}}>
            <p className="title" style={{color: '#999'}}>Já Realizados</p>
            {services.map(service => (
                <div key={service.id} className="service-content">
                    <div className="header">
                        <div className="user">
                            <img src={service.picture_url} alt="usuario"/>
                            <p>{service.name}</p>
                        </div>
                        <p id="status" className="begining">{service.status}</p>
                    </div>
                    <div className="content">
                        <div className="request-content">
                            <p className="title">Descrição</p>
                            <p className="description" id="request">{service.request}</p>
                        </div>
                        <p style={{display: 'block'}} id="price">R$ {service.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServieComponent;