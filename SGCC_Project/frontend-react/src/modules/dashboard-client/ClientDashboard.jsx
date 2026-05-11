import React, { useState, useEffect } from 'react';
import styles from './ClientDashboard.module.css';
import ActiveSession from './ActiveSession';

const ClientDashboard = ({ user }) => {
    const [balance, setBalance] = useState(user.saldo || 0);
    const [activeSession, setActiveSession] = useState(null); // Datos de la sesión si existe
    const [view, setView] = useState('client-dashboard'); // Para manejar vistas dinámicas

    // Simulación de conexión WebSocket para actualizaciones de saldo/sesión
    useEffect(() => {
        // Aquí iría la lógica de socket.io para recibir bloqueos remotos o actualizaciones de saldo
        console.log("Conectado al sistema de tiempo real SGCC");
    }, []);

    return (
        <div className={styles.container}>
            {/* Barra Lateral */}
            <nav className={styles.sidebar}>
                <div className={styles.logo}>SGCC<span>.</span></div>
                <ul className={styles.menu}>
                    <li className={view === 'client-dashboard' ? styles.active : ''} onClick={() => { setView('client-dashboard'); window.location.href = '/client-dashboard'; }}>
                        <i className="fas fa-home"></i> Inicio
                    </li>
                    <li className={view === 'booking' ? styles.active : ''} onClick={() => { setView('booking'); window.location.href = '/booking'; }}>
                        <i className="fas fa-calendar-alt"></i> Reservar Equipo
                    </li>
                    <li className={view === 'shopping-cart' ? styles.active : ''} onClick={() => { setView('shopping-cart'); window.location.href = '/shopping-cart'; }}>
                        <i className="fas fa-utensils"></i> Menú Digital
                    </li>
                </ul>
                <div className={styles.logout}>
                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </div>
            </nav>

            {/* Contenido Principal */}
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.userGreeting}>
                        <h1>Hola, {user.nombre} <span className={styles.badge}>{user.tipo}</span></h1>
                        <p>Bienvenido a tu Gaming Center favorito.</p>
                    </div>
                    <div className={styles.balanceCard}>
                        <span>Saldo Disponible</span>
                        <h2>${balance.toLocaleString()} CLP</h2>
                        <button className={styles.rechargeBtn}>Recargar Saldo</button>
                    </div>
                </header>

                <section className={styles.contentBody}>
                    {/* Componente de Sesión Activa */}
                    <ActiveSession 
                        session={activeSession} 
                        hourlyRate={user.tipo === 'VIP' ? 1500 : 2000} 
                    />

                    {/* Vistas dinámicas */}
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <h3>Acceso Rápido</h3>
                            <div className={styles.quickActions}>
                                <button onClick={() => setView('menu')}>Pedir Snack</button>
                                <button onClick={() => setView('reserve')}>Ver Disponibilidad</button>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <h3>Mis Notificaciones</h3>
                            <p className={styles.emptyMsg}>No tienes mensajes nuevos de administración.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ClientDashboard;