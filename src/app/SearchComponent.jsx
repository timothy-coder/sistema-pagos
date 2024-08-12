"use client";

import { useState } from 'react';

export default function SearchComponent() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/search?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setResult(null);
      }
    } catch (err) {
      setError('Error al buscar los datos.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ color: 'black'}} className='box-form'>
      <h1 style={{fontWeight: "bold", fontSize: "32px"}}>ADMISIÓN</h1>
      <br />
      <img src="https://yachay.digital/wp-content/uploads/2021/03/uncp.png" alt="logo" style={{height: "100px", width: "100px"}}/>
      <br />
      <h2>Buscar Datos por DNI:</h2>
      <input 
        type="text" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        placeholder="Ingrese DNI" 
        className='input-form'
        
      />
      <button 
        onClick={handleSearch} 
        className='btn-primary'
      >
        Buscar
      </button>

      {loading && 
        <div style={{ color: 'black', marginTop: '20px' }}>
          <br />
          <p>Cargando...</p>
        </div>
      }

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div style={{ width: '100%', marginTop: '20px',color:'black', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h2>Resultado:</h2>
          <p><strong>DNI:</strong> {result.DOCUMENTO}</p>
          <p><strong>Nombre y apellido:</strong> {result['RAZÓN SOCIAL']}</p>
          <p><strong>Número de recibo:</strong> {result.SERIE} - {result.NÚMERO}</p>
          <p><strong>Fecha del recibo:</strong> {result['FEC. EMISIÓN']}</p>
          <p><strong>Monto:</strong> {result.IMPORTE}</p>

          <button onClick={handlePrint} className='btn-primary' style={{ marginTop: '20px' }}>
            Imprimir
          </button>
        </div>
      )}
    </div>
  );
}
