import StatsCards from '@/components/adminComponents/homeComp/DashboardCards';
import DashboardSection from '@/components/adminComponents/homeComp/tables';
import React from 'react'

const AdminHomepage = () => {
  return (
    <div>
      <StatsCards />
      <DashboardSection />
    </div>
  );
}

export default AdminHomepage