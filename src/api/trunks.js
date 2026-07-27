const trunkList = [
  { name: 'mycarrier01', host: '41.226.12.10', port: 5060 },
  { name: 'ooredoo_trunk', host: '197.15.20.5', port: 5060 },
  { name: 'legacy_iax', host: '10.0.0.50', port: 4569 },
];

export const getTrunkStatus = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return trunkList.map((t, i) => {
    const isUp = Math.random() > 0.1; // 90% de chances d'être up, pour un rendu réaliste
    const latency = isUp ? Math.floor(Math.random() * 150) : null;
    return {
      id: i + 1,
      ...t,
      status: isUp ? 'OK' : 'FAIL',
      latency,
      raw: isUp ? `OK (${latency}ms)` : 'UNREACHABLE',
    };
  });
};