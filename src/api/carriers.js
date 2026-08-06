const mockCarriers = [
  {
    carrier_id: 'ORANGE_TN',
    carrier_name: 'Orange Tunisie',
    protocol: 'SIP',
    server_ip: '41.226.12.10',
    carrier_description: 'Trunk principal sortant (Campagnes VIP & Standard)',
    account_entry: '[orange_tn]\ntype=friend\nhost=41.226.12.10',
    globals_string: 'ORANGETN = SIP/ORANGE_TN',
    dialplan_entry: 'exten => _9216X.,1,Dial(${ORANGETN}/${EXTEN:4})',
    active: 'Y',
  },
  {
    carrier_id: 'OOREDOO_TN',
    carrier_name: 'Ooredoo Tunisie',
    protocol: 'PJSIP',
    server_ip: '197.15.20.5',
    carrier_description: 'Trunk secondaire (Campagne Relance)',
    account_entry: '[ooredoo_tn]\ntype=endpoint\nendpoint/ooredoo_tn',
    globals_string: 'OOREDOO = PJSIP/ooredoo_tn',
    dialplan_entry: 'exten => _8216X.,1,Dial(${OOREDOO}/${EXTEN:4})',
    active: 'Y',
  },
  {
    carrier_id: 'OVH_FR',
    carrier_name: 'OVH Telecom France',
    protocol: 'SIP',
    server_ip: '91.121.129.20',
    carrier_description: 'Trunk International / Inbound France (Campagne SAVFR)',
    account_entry: '[ovh_fr]\ntype=friend\nhost=sip.ovh.fr',
    globals_string: 'OVHFR = SIP/OVH_FR',
    dialplan_entry: 'exten => _933X.,1,Dial(${OVHFR}/${EXTEN:1})',
    active: 'Y',
  },
  {
    carrier_id: 'LEGACY_IAX',
    carrier_name: 'Ancien fournisseur',
    protocol: 'IAX2',
    server_ip: '10.0.0.50',
    carrier_description: 'Désactivé, en attente de suppression',
    account_entry: '',
    globals_string: '',
    dialplan_entry: '',
    active: 'N',
  },
];


export const getCarriers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mockCarriers];
};

export const createCarrier = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (mockCarriers.some((c) => c.carrier_id === data.carrier_id)) {
    throw new Error('exists');
  }
  mockCarriers.push({ ...data });
  return { success: true };
};

export const updateCarrier = async (originalCarrierId, data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockCarriers.findIndex((c) => c.carrier_id === originalCarrierId);
  if (index !== -1) {
    mockCarriers[index] = { ...data };
  }
  return { success: true };
};

export const deleteCarrier = async (carrierId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockCarriers.findIndex((c) => c.carrier_id === carrierId);
  if (index !== -1) mockCarriers.splice(index, 1);
  return { success: true };
};