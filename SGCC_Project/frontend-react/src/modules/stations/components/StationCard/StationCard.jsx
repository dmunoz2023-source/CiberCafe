import styles from './StationCard.module.css';

export default function StationCard({ id, isOccupied, minutesActive }) {
  // Configuración según requerimientos (BR-10 y BR-15)
  const PRICE_PER_MINUTE = 50; // Ejemplo: $50 por minuto
  const DISCOUNT_THRESHOLD = 300; // 5 horas = 300 minutos

  const calculateTotal = (minutes) => {
    let total = minutes * PRICE_PER_MINUTE;
    
    // Aplicar BR-15: Descuento por uso extendido > 5 horas
    if (minutes > DISCOUNT_THRESHOLD) {
      total = total * 0.80; // Ejemplo: 20% de descuento
    }
    return total;
  };

  return (
    <div className={`${styles.card} ${isOccupied ? styles.occupied : styles.available}`}>
      <div className={styles.stationNumber}>PC-0{id}</div>
      <p className={styles.statusText}>
        {isOccupied ? '🔴 Ocupado' : '🟢 Disponible'}
      </p>
      
      {isOccupied && (
        <div className={styles.sessionDetails}>
          <p>Tiempo: {minutesActive} min</p>
          <p className={styles.priceInfo}>
            Total: ${calculateTotal(minutesActive).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}