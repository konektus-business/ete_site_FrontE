import { useOutletContext } from 'react-router-dom';
import CarriersList from './Operateur/CarriersList';
import AddCarrier from './Operateur/AddCarrier';
import EtatSip from './Operateur/EtatSip';
import HorairesTab from './Operateur/HorairesTab';

export default function Operateurs() {
  const { activeTab } = useOutletContext();

  return (
    <div className="p-4">
      {activeTab === 'liste' && <CarriersList />}
      {activeTab === 'ajouter' && <AddCarrier />}
      {activeTab === 'sip' && <EtatSip />}
      {activeTab === 'horaires' && <HorairesTab />}
    </div>
  );
}