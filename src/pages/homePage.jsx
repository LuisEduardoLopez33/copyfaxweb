import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from '../components/footer';
import "../assets/css/homePage.css"
import ViewContent from "../components/viewcontent";
import axios from 'axios';
import iconRefres from "../assets/refresh-option.png"

function HomePage(){
    
  const [eventos, setEventos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [eventCount, setEventCount] = useState(null);


  const fetchData = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://187.135.95.246',
        // baseURL: 'http://localhost:5000',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
        },
      });

      const response = await axiosInstance.get('/email/all');
      setEventos(response.data.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
   
  

  useEffect(() => {
      fetchData();
    }, []);


  const deleteEvent = (id) => {
    const nuevosEventos = eventos.filter(evento => evento.id !== id);
    setEventos(nuevosEventos);
  }
  

  function updateDataGeneral(){
    fetchData();
    setShowToast(true);
   
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  }


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  
  const handleEventCountChange = (event) => {
    setEventCount(event.target.value);
  };
  

    return (
        <div className=" fondo container-lg-11 container-xl-11 container-xxl-11 container-md-11 container-sm-10 ">
            <div>
                <Header/>
            </div>
            <div className='filters-container mt-5'>
              <div className='filters'>
                <div className='p-2'>
                  <div>
                    <input type="date" onChange={handleDateChange} 
                            style={{
                              backgroundColor: '#ADD8E6',
                              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                              padding:'8px',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              border: 'none',
                              }}/>
                  </div>
                </div>
                
                <div className='p-2'>
                  <input type="text" onChange={handleSearchChange} placeholder='Por Nombre o Serie'
                  style={{
                    backgroundColor: '#ADD8E6',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    padding:'8px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: 'none',
                    }} 
                  />
                </div>
                
                <div className='p-2'>
                  <input type="number" onChange={handleEventCountChange} placeholder='Cantidad de errores'
                        style={{
                          backgroundColor: '#ADD8E6',
                          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                          padding:'8px',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          border:'none'
                        }}
                  />
                </div>
              </div>
              <div>
                <button style={{
                  backgroundColor: '#00FFFF',
                  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                  padding:'2px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  border: 'none'
                }}
                  onClick={updateDataGeneral}> 
                    Actualizar
                    <img className='p-1' src={iconRefres} alt="icon refresh" width="40" />
                </button>

                <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', top: 0, right: 0, backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                  <div className="toast-header">
                    <strong className='mr-auto'>Notificación</strong>
                  </div>
                  <div className="toast-body">
                    ¡Datos actualizados!
                  </div>  
                </div>
              </div>
            </div>

            <div className=" fila container-lg-10 container-xl-10 container-xxl-10 container-md-12 container-sm-12 ">
           
             

            {eventos.filter(item => !selectedDate || item.received_date.slice(0, 10) === formatDate(selectedDate))
                    .filter(item => item.serie.includes(searchString) || item.device_name.includes(searchString))
                    .filter(item => !eventCount || item.events.length === Number(eventCount))
                    .map((item) => (
                      <div className='row justify-content-center align-items-center'>
                        <div className='col-lg-8 col-xl-8 col-xxl-8 col-md-3 col-sm-3 '>
                          <ViewContent key={item.id} email={item} deleteEvent={deleteEvent}/>
                        </div>
                      </div>)
                    )
            }
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>
       
    )
}
export default HomePage;