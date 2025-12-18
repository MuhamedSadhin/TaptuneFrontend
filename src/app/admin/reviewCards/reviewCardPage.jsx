import AdminReviewCardStats from '@/components/adminComponents/reviewCardComp/AdminReviewCardStats';
import AdminReviewCardOrders from '@/components/adminComponents/reviewCardComp/CardOrderView';
import React from 'react'

const ReviewCardPage = () => {
  return (
    <div className='flex gap-6 flex-col'>
      <AdminReviewCardStats />
      <AdminReviewCardOrders />
    </div>
  );
}

export default ReviewCardPage
