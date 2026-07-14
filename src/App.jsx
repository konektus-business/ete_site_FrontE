import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CrmLayout from './components/layout/CrmLayout';

import Dashboard from './pages/crm/Dashboard';
import Clients from './pages/crm/Clients';
import Tickets from './pages/crm/Tickets';
import Factures from './pages/crm/Factures';
import Settings from './pages/crm/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-8">Page d'accueil (Vitrine)</div>} />
        <Route path="/login" element={<div className="p-8">Page Connexion</div>} />

        <Route path="/crm" element={<CrmLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="factures" element={<Factures />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;