'use client';

import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const InsightsContainer = styled.div`
  padding: 24px;
  width: calc(100% - 223px);
  min-height: 100vh;
  background: var(--bg-surface-primary);
  margin-left: 223px;
  overflow-x: hidden;

  @media screen and (max-width: 449px) {
    width: 100%;
    margin-left: 0;
    padding: 16px;
  }
`;

export const Title = styled.h1`
  ${Typography.heading_heading_semibold}
  color: var(--text);
  margin-bottom: 24px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  max-width: min(1200px, 100%);
  margin: 0 auto;
`;
