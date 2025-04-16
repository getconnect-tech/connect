'use client';

import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const ReportCard = styled.div`
  background: var(--bg-surface-secondary);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: min(1200px, 100%);
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (max-width: 449px) {
    padding: 16px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const ReportTitle = styled.h2`
  ${Typography.body_md_medium}
  color: var(--text);
  margin: 0;
`;

export const InfoIcon = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-surface-tertiary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: help;
`;

export const ReportDescription = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text-secondary);
  margin-bottom: 24px;
  margin-top: 4px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  ${Typography.body_sm_regular}
`;
