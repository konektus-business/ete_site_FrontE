import { useOutletContext } from 'react-router-dom';

export default function Factures() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4 bg-white rounded shadow">
      <p>Contenu de la page des factures</p>
    </div>
  );
}