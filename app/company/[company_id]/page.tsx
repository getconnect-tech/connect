import React from 'react';
import CompanyDetails from './companyDetails';

function CompanyDetailPage({
  params: { company_id },
}: {
  params: { company_id: string };
}) {
  return (
    <>
      <CompanyDetails company_id={company_id} />
    </>
  );
}

export default CompanyDetailPage;
