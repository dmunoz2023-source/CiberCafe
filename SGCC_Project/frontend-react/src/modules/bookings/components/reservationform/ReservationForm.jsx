import { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    userId: '',
    age: '',
    pcNumber: '1',
    timeSlot: '10:00',
  });
  
  const [error, setError] = useState('');
  const BASE_PRICE = 5000; // Precio base de reserva

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación de Regla de Negocio BR-01 
  useEffect(() => {
    const hour = parseInt(formData.timeSlot.split(':')[0]);
    if (hour >= 20 && parseInt(formData.age) < 15) {
      setError('Restricción BR-01: Menores de 15 años no pueden reservar después de las 20:00.');
    } else {
      setError('');
    }
  }, [formData.timeSlot, formData.age]);

  const depositAmount = BASE_PRICE * 0.30; // BR-04: Exigir abono del 30% 

  return (
    <div className={styles.formCard}>
      <h2>Nueva Reserva (FR-04)</h2>
      
      <div className={styles.field}>
        <label>Edad del Cliente</label>
        <input name="age" type="number" onChange={handleInputChange} value={formData.age} placeholder="Ej: 14" />
      </div>

      <div className={styles.field}>
        <label>Número de Estación</label>
        <select name="pcNumber" onChange={handleInputChange}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>PC-0{n}</option>)}
        </select>
      </div>

      <div className={styles.field}>
        <label>Franja Horaria</label>
        <select name="timeSlot" onChange={handleInputChange}>
          <option value="10:00">10:00 AM</option>
          <option value="14:00">02:00 PM</option>
          <option value="20:00">08:00 PM</option>
          <option value="22:00">10:00 PM</option>
        </select>
      </div>

      {error && <div className={styles.warning}>{error}</div>}

      <div className={styles.paymentSummary}>
        <p>Total Reserva: ${BASE_PRICE.toLocaleString()}</p>
        <p className={styles.depositText}>Abono requerido (30%): ${depositAmount.toLocaleString()}</p>
        <small>* Requerido para confirmar el cupo (BR-04)</small>
      </div>

      <button className={styles.submitBtn} disabled={!!error || !formData.age}>
        Confirmar Reserva
      </button>
    </div>
  );
}