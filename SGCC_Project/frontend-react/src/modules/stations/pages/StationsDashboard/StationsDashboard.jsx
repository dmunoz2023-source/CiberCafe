import { useState, useEffect } from 'react';
import StationCard from '../../components/StationCard/StationCard';
import styles from './StationsDashboard.module.css';

export default function StationsDashboard() {
  // Simulamos datos que vendrían de la base de datos (PostgreSQL) [cite: 21]
  const [stations, setStations] = useState([
    { id: 1, isOccupied: true, minutesActive: 45 },
    { id: 2, isOccupied: false, minutesActive: 0 },
    { id: 3, isOccupied: true, minutesActive: 310 }, // Ejemplo para probar el descuento > 5h (BR-15) 
    { id: 4, isOccupied: false, minutesActive: 0 },
  ]);

  // Simulación del FR-02: Incremento automático del tiempo cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setStations(prevStations => 
        prevStations.map(station => 
          station.isOccupied 
            ? { ...station, minutesActive: station.minutesActive + 1 }
            : station
        )
      );
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Panel de Estaciones - SGCC</h1>
        <p>Control de sesiones y cobro por minuto en tiempo real</p>
      </header>

      <div className={styles.grid}>
        {stations.map(station => (
          <StationCard 
            key={station.id}
            id={station.id}
            isOccupied={station.isOccupied}
            minutesActive={station.minutesActive}
          />
        ))}
      </div>
    </div>
  );
}