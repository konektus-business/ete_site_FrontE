import { BrowserRouter, Routes, Route, Navigate, createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CrmLayout from './components/layout/CrmLayout';

import Dashboard from './pages/crm/Dashboard';
import CDR from './pages/crm/CDR';
import Compagne from './pages/crm/Compagne';
import Enregistrement from './pages/crm/Enregistrement';
import Integration from './pages/crm/Integration';
import Stats from './pages/crm/Stats';
import Leads from './pages/crm/Leads';
import Operateur from './pages/crm/Operateur';
import PanneauLive from './pages/crm/PanneauLive';
import Users from './pages/crm/Users';
import VOIP from './pages/crm/VOIP';
import VTM from './pages/crm/VTM';


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
     <Route path="/crm" element={<CrmLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="panneauLive" element={<PanneauLive />} />
        <Route path="stats" element={<Stats />} />
        <Route path="enregistrement" element={<Enregistrement />} />
        <Route path="operateur" element={<Operateur />} />
        <Route path="compagnes" element={<Compagne />} />
        <Route path="leads" element={<Leads />} />
        <Route path="CDR" element={<CDR />} />
        <Route path="VTM" element={<VTM />} />
        <Route path="integration" element={<Integration />} />
        <Route path="VOIP" element={<VOIP />} />
      </Route>
    </>

  ))
  return (
      <RouterProvider router={router} />

  );
}

export default App;