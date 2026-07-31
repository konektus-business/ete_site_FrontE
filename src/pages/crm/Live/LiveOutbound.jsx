import { ArrowUpCircle } from 'lucide-react';
import { useLiveData } from '../../../hooks/useLiveData';
import { outboundWidgetsConfig } from '../../../config/liveWidgets';
import LiveWidgetsSection from '../../../components/live/LiveWidgetsSection';

export default function LiveOutbound() {
  const { data, history, loading } = useLiveData(outboundWidgetsConfig);

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64"><div className="text-sm text-gray-400">Chargement...</div></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center gap-2 mb-4">
        <ArrowUpCircle className="w-5 h-5 text-[#1EB394]" />
        <h5 className="text-sm font-semibold text-gray-800">Appels sortants</h5>
        <span className="ml-auto text-xs text-gray-400">Dernière mise à jour: {data.timestamp}</span>
      </div>
      <LiveWidgetsSection config={outboundWidgetsConfig} data={data} history={history} />
    </div>
  );
}