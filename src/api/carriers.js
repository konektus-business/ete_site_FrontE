const mockCarriers = [
  {
    id: 1,
    carrier_id: 'mycarrier01',
    carrier_name: 'Orange Tunisie',
    protocol: 'SIP',
    server_ip: '41.226.12.10',
    carrier_description: 'Trunk principal sortant',
    account_entry: '',
    globals_string: '',
    dialplan_entry: '',
    active: 'Y',
  },
  {
    id: 2,
    carrier_id: 'ooredoo_trunk',
    carrier_name: 'Ooredoo Tunisie',
    protocol: 'PJSIP',
    server_ip: '197.15.20.5',
    carrier_description: 'Trunk secondaire',
    account_entry: '',
    globals_string: '',
    dialplan_entry: '',
    active: 'Y',
  },
  {
    id: 3,
    carrier_id: 'legacy_iax',
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
  return mockCarriers;
};

export const createCarrier = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newCarrier = { id: Date.now(), ...data };
  mockCarriers.push(newCarrier);
  return newCarrier;
};

export const updateCarrier = async (originalCarrierId, data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockCarriers.findIndex((c) => c.carrier_id === originalCarrierId);
  if (index !== -1) {
    mockCarriers[index] = { ...mockCarriers[index], ...data };
  }
  return mockCarriers[index];
};