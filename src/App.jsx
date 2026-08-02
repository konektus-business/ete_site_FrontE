import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, RouterProvider } from 'react-router-dom';


// Public layout & pages
import PublicLayout from './pages/public/PublicLayout';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import About from './pages/public/About';

// Auth pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Register from './pages/auth/Register';

// CRM layout & pages
import CrmLayout from './pages/crm/CrmLayout';
import Dashboard from './pages/crm/Dashboard';
import CDR from './pages/crm/CDR';
import Compagnes from './pages/crm/Compagnes';
import Enregistrement from './pages/crm/Enregistrement';
import Integration from './pages/crm/Integration';
import Stats from './pages/crm/Stats';
import Leads from './pages/crm/Leads';
import Operateur from './pages/crm/Operateur';
import PanneauLive from './pages/crm/PanneauLive';
import Users from './pages/crm/Users';
import VOIP from './pages/crm/VOIP';
import VTM from './pages/crm/VTM';

import './styles/index.css';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes – layout with header/footer */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Auth routes – no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        {/* CRM routes – nested under /crm with CrmLayout */}
        <Route path="/crm" element={<CrmLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="panneauLive" element={<PanneauLive />} />
          <Route path="stats" element={<Stats />} />
          <Route path="enregistrement" element={<Enregistrement />} />
          <Route path="operateur" element={<Operateur />} />
          <Route path="compagnes" element={<Compagnes />} />
          <Route path="leads" element={<Leads />} />
          <Route path="CDR" element={<CDR />} />
          <Route path="VTM" element={<VTM />} />
          <Route path="integration" element={<Integration />} />
          <Route path="VOIP" element={<VOIP />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;