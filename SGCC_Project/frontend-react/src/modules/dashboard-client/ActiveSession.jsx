import React, { useState, useEffect } from 'react';
import styles from './ActiveSession.module.css';

const ActiveSession = ({ session, hourlyRate }) => {
    const [elapsedMinutes, setElapsedMinutes] = useState(0);
    const [cost, setCost] = useState(0);

    useEffect(() => {
        if (!session) return;

        const interval = setInterval(() => {
            const now = new Date();
            const start = new Date(session.startTime);
            const diff = Math.floor((now - start) / 60000); // Diferencia en minutos
            
            setElapsedMinutes(diff);

            // Lógica BR-10 y BR-15
            let currentRate = hourlyRate / 60; // Precio por minuto
            let total = diff * currentRate;

            // Descuento automático si supera las 5 horas (300 minutos)
            if (diff >= 300) {
                total = total * 0.85; // Ejemplo: 15% de descuento
            }

            setCost(Math.round(total));
        }, 10000); // Actualiza cada 10 segundos para precisión

        return () => clearInterval(interval);
    }, [session, hourlyRate]);

    if (!session) {
        return (
            <div className={styles.noSession}>
                <i className="fas fa-desktop"></i>
                <p>No tienes una sesión de juego activa en este momento.</p>
            </div>
        );
    }

    return (
        <div className={styles.sessionCard}>
            <div className={styles.timerInfo}>
                <span className={styles.label}>ESTACIÓN ACTUAL: <strong>{session.stationId}</strong></span>
                <div className={styles.timeTicker}>
                    <h3>{Math.floor(elapsedMinutes / 60)}h {elapsedMinutes % 60}m</h3>
                    <span>Tiempo transcurrido</span>
                </div>
            </div>
            <div className={styles.costInfo}>
                <span className={styles.label}>COBRO PROPORCIONAL</span>
                <h2>${cost.toLocaleString()}</h2>
                {elapsedMinutes >= 300 && <span className={styles.discountTag}>¡Descuento 5h aplicado!</span>}
            </div>
            <button className={styles.stopBtn}>Finalizar Sesión</button>
        </div>
    );
};

export default ActiveSession;