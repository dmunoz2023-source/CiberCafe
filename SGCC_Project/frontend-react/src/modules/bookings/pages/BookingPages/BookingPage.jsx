import ReservationForm from '../../components/ReservationForm/ReservationForm';
import styles from './../../components/reservationform/ReservationForm.module.css'; // Crea este CSS si deseas un fondo específico

export default function BookingPage() {
  return (
    <div style={{ backgroundColor: '#0f0f1a', minHeight: '100vh', padding: '2rem' }}>
      <ReservationForm />
    </div>
  );
}

