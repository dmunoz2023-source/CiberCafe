// import css global
import './styles/global.css';
// import routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import KitchenBoard from "./modules/kitchen-display/KitchenBoard";
import LoginPage from "./modules/auth/pages/LoginPage/LoginPage";


import BookingPage from "./modules/bookings/pages/BookingPages/BookingPage";


import StationsDashboard from "./modules/stations/pages/StationsDashboard/StationsDashboard";
import ShoppingCart from "./modules/menu-digital_LUCIANA/ShoppingCart";
import ClientDashboard from './modules/dashboard-client/ClientDashboard';

export default function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LoginPage/>} />
        <Route path="/booking" element={<BookingPage/>} />
        <Route path="/stations" element={<StationsDashboard/>} />
        <Route path="/kitchen-board" element={<KitchenBoard/>} />
        <Route path="/shopping-cart" element={<ShoppingCart userId={1} stationId={1} userBalance={20000} />} />
        <Route path="/client-dashboard" element={<ClientDashboard user={{ id: 1, username: "john_doe", balance: 20, saldo: 20 }} />} />
      </Routes>
    </Router>
  );
}

 /*   { <LoginPage />
      <BookingPage/> }
      { <StationsDashboard /> }
      { <KitchenBoard /> }
      { <ShoppingCart 
        userId={1}
        stationId={1}
        userBalance={20000}
      /> }
      { <ClientDashboard user={{ id: 1, username: "john_doe", balance: 20, saldo: 20 }} /> } */