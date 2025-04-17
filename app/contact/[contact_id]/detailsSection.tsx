import React, { useMemo } from 'react';
import {
  InformationItem,
  InformationSection,
  Label,
  PersonalDetailSection,
  Title,
  Value,
} from './style';

interface Props {
  title: string;
  detailItem: { label: string; value: string }[];
}

function DetailsSection({ title, detailItem }: Props) {
  const renderDetailItem = useMemo(() => {
    return detailItem.map((item) => (
      <InformationItem key={item.label}>
        <Label>{item.label}</Label>
        <Value>{item.value}</Value>
      </InformationItem>
    ));
  }, [detailItem]);
  return (
    <PersonalDetailSection>
      <Title>{title}</Title>
      <InformationSection>{renderDetailItem}</InformationSection>
    </PersonalDetailSection>
  );
}

export default DetailsSection;
