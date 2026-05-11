// import css global
import './styles/global.css';

import KitchenBoard from "./modules/kitchen-display/KitchenBoard";
/* import LoginPage from "./modules/auth/pages/LoginPage/LoginPage";


import BookingPage from "./modules/bookings/pages/BookingPages/BookingPage";
*/

import StationsDashboard from "./modules/stations/pages/StationsDashboard/StationsDashboard";
/* import ShoppingCart from "./modules/menu-digital_LUCIANA/ShoppingCart";
import ClientDashboard from './modules/dashboard-client/ClientDashboard';
 */
export default function App() {
  return (
    <div>
      {/* <LoginPage />
      <BookingPage/> */}
      {/* <StationsDashboard /> */}
      <KitchenBoard />
      {/* <ShoppingCart 
        userId={1}
        stationId={1}
        userBalance={20000}
      /> */}
      {/* <ClientDashboard user={{ id: 1, username: "john_doe", balance: 20, saldo: 20 }} /> */}
    </div>
  );
}