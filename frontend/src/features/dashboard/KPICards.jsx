import React from 'react';
import Card from '../../components/ui/Card';

const KPICards = () => {
  const kpis = [
    { title: 'Total Campaigns', value: '25', change: '+5%' },
    { title: 'Active Users', value: '1,234', change: '+12%' },
    { title: 'Revenue', value: '$45,678', change: '+8%' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {kpis.map((kpi, index) => (
        <Card key={index}>
          <h3 className="text-lg font-semibold">{kpi.title}</h3>
          <p className="text-2xl font-bold">{kpi.value}</p>
          <span className="text-green-500">{kpi.change}</span>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;