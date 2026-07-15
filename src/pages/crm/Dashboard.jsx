import { useState, useEffect } from 'react';
import { TrendingUp, UserPlus, Users, Target } from 'lucide-react';
import { getDashboardStats } from '../../api/stats';
import KPIWidget from '../../components/dashboard/KPIWidget';
import KPISkeleton from '../../components/dashboard/KPISkeleton';
import React from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <KPISkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap grid grid-cols-1 md:grid-cols-4">
      <KPIWidget 
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M9 19V13C9 11.8962 8.10383 11 7 11H5C3.89617 11 3 11.8962 3 13V19C3 20.1038 3.89617 21 5 21H7C8.10383 21 9 20.1038 9 19ZM9 19V9C9 7.89617 9.89617 7 11 7H13C14.1038 7 15 7.89617 15 9V19M9 19C9 20.1038 9.89617 21 11 21H13C14.1038 21 15 20.1038 15 19M15 19V5C15 3.89617 15.8962 3 17 3H19C20.1038 3 21 3.89617 21 5V19C21 20.1038 20.1038 21 19 21H17C15.8962 21 15 20.1038 15 19Z" 
                  className="stroke-[#1EB394]" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
          </svg>
            } 
        title="Revenus du mois"
        badge="CE MOIS"
        value={`${stats.revenus.montant.toLocaleString('fr-FR')} €`}
        variation={stats.revenus.variation}
        variationLabel="vs mois dernier"
        showPercent={true}
      >
      
        <div className="font-normal text-[11px] leading-[16.5px] align-middle text-[#536175]">
          Objectif mensuel : {stats.revenus.objectif.toLocaleString('fr-FR')} €
        </div>
        <div className="w-full bg-[#E0E5EA] rounded-full h-2">
          <div
            className="bg-crmPrimary h-2 rounded-l-full"
            style={{ width: `${Math.min((stats.revenus.montant / stats.revenus.objectif) * 100, 100)}%` }}
          />
        </div>
      </KPIWidget>

      <KPIWidget
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M18 9V12M18 12V15M18 12H21M18 12H15M13 7C13 9.20766 11.2077 11 9 11C6.79234 11 5 9.20766 5 7C5 4.79234 6.79234 3 9 3C11.2077 3 13 4.79234 13 7ZM3 20C3 16.6885 5.68851 14 9 14C12.3115 14 15 16.6885 15 20V21H3V20Z" 
              className="stroke-[#1EB394]" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              />
         </svg>
        }
        title="Nouveaux abonnements"
        badge="CE MOIS"
        value={stats.abonnements.total}
        variation={stats.abonnements.variation}
        variationLabel=" vs mois dernier"
        showPercent={false}
      >
      <div className="flex w-full">
        <div className="flex-1 flex flex-col gap-1 pr-3 items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1DDAB3]" />
            <span className="font-medium text-[10px] leading-[15px] text-center align-middle text-[#5E6671]">Essentiel</span>
          </div>
          <span className="text-[16px] font-bold text-[#1E293B]">
            {stats.abonnements.parPlan.essentiel}
          </span>
        </div>

      <div className="w-px bg-[#E0E5EA]" />

        <div className="flex-1 flex flex-col gap-1 px-3 items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span className="font-medium text-[10px] leading-[15px] text-center align-middle text-[#5E6671]">Avancé</span>
          </div>
          <span className="text-[16px] font-bold text-[#1E293B]">
            {stats.abonnements.parPlan.avance}
          </span>
        </div>

        <div className="w-px bg-[#E0E5EA]" />

        <div className="flex-1 flex flex-col gap-1 pl-3 items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#064E3B]" />
            <span className="font-medium text-[10px] leading-[15px] text-center align-middle text-[#5E6671]">Pro</span>
          </div>
          <span className="text-[16px] font-bold text-[#1E293B] ">
            {stats.abonnements.parPlan.pro}
          </span>
        </div>
      </div>

      </KPIWidget>

      <KPIWidget
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M7.356 16.143C7.126 16.717 7 17.344 7 18V20H17V18C17 17.344 16.874 16.717 16.644 16.143C15.8842 14.2443 14.0451 12.9993 12 12.9993C9.9549 12.9993 8.11578 14.2443 7.356 16.143ZM7 20H2V18C2.00009 16.722 2.80979 15.5844 4.01725 15.1658C5.22471 14.7471 6.56484 15.1394 7.356 16.143M15 7C15 8.65575 13.6557 10 12 10C10.3443 10 9 8.65575 9 7C9 5.34425 10.3443 4 12 4C13.6557 4 15 5.34425 15 7ZM7 10C7 11.1038 6.10383 12 5 12C3.89617 12 3 11.1038 3 10C3 8.89617 3.89617 8 5 8C6.10383 8 7 8.89617 7 10Z" 
              className="stroke-[#1EB394]" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Utilisateurs actifs"
        badge="CETTE SEMAINE"
        value={stats.utilisateursActifs.total}
        variation={stats.utilisateursActifs.variation}
        variationLabel=" cette semaine"
        showPercent={false}
      >
        <div className="text-xs text-slate-500">
          
          Connectés aujourd'hui : <span className='text-[#059669]'>
          {stats.utilisateursActifs.connectesAujourdhui}
          </span>

        </div>
      </KPIWidget>

      <KPIWidget
        icon={
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1038 20 20 19.1038 20 18V6C20 4.89617 19.1038 4 18 4H6C4.89617 4 4 4.89617 4 6V18C4 19.1038 4.89617 20 6 20Z" 
              className="stroke-[#1EB394]" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        }
        title="Taux de conversion"
        badge="CE MOIS"
        value={`${stats.tauxConversion.pourcentage}%`}
        variation={stats.tauxConversion.variation}
        variationLabel="vs mois dernier"
        subLabel={<>Essais → Abonnements <br /> payants</>}
        showPercent={true}
      >
        
        <div className="text-xs text-slate-500">Sur {stats.tauxConversion.essaisTotal} essais ce mois</div>
      </KPIWidget>
    </div>
  );
}