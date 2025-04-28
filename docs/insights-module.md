# Insights Module Documentation

## Overview

The Insights module provides a comprehensive analytics dashboard for tracking key performance metrics in a workspace. It offers real-time and historical data visualization for queue management, response times, and ticket resolution metrics.

## Features

### 1. Queue Size Tracking

- **Current Queue Size**: Real-time display of tickets in the "Todo" state
- **Historical Data**: Visualization of queue size trends over time
- **Business Hours Consideration**: Accounts for workspace operating hours

### 2. First Response Time Analysis

- **Median Response Time**: Tracks the average time taken for first response
- **Time Zone Support**: Considers workspace timezone settings
- **Historical Trends**: Shows response time patterns over selected periods

### 3. Resolution Time Metrics

- **Median Resolution Time**: Measures average time to resolve tickets
- **Business Hours Calculation**: Accounts for non-working hours
- **Trend Analysis**: Visualizes resolution time patterns

## Technical Architecture

### Frontend Components

- **Main Component**: `app/insights/insights.tsx`
- **State Management**: MobX store (`stores/insightsStore.ts`)
- **Chart Components**: Custom chart implementation
- **Date Picker**: Custom date range selector

### Backend Services

- **Data Processing**: `services/serverSide/insights.ts`
- **API Routes**:
  - `/api/insights/queue-size`
  - `/api/insights/first-response-time`
  - `/api/insights/resolution-time`

### State Management

```typescript
class InsightsStore {
  queueSize: QueueSizeInsights | null;
  firstResponseTime: FirstResponseTimeInsights | null;
  resolutionTime: ResolutionTimeInsights | null;
  loading: boolean;
}
```

## API Endpoints

### 1. Queue Size

- **Endpoint**: `/api/insights/queue-size`
- **Method**: GET
- **Query Parameters**:
  - `startDate` (optional): Start date for data range
  - `endDate` (optional): End date for data range
- **Response**: Queue size data with historical trends

### 2. First Response Time

- **Endpoint**: `/api/insights/first-response-time`
- **Method**: GET
- **Query Parameters**:
  - `startDate` (optional): Start date for data range
  - `endDate` (optional): End date for data range
- **Response**: First response time metrics and trends

### 3. Resolution Time

- **Endpoint**: `/api/insights/resolution-time`
- **Method**: GET
- **Query Parameters**:
  - `startDate` (optional): Start date for data range
  - `endDate` (optional): End date for data range
- **Response**: Resolution time metrics and trends

## Data Models

### Queue Size Response

```typescript
interface QueueSizeResponse {
  data: Array<{
    date: string;
    queueSize: number;
  }>;
  startDate: string;
  endDate: string;
  currentQueueSize: number;
}
```

### First Response Time Response

```typescript
interface FirstResponseTimeResponse {
  data: Array<{
    date: string;
    median: number;
    totalTickets: number;
  }>;
  overallMedian: number;
  startDate: string;
  endDate: string;
}
```

### Resolution Time Response

```typescript
interface ResolutionTimeResponse {
  data: Array<{
    date: string;
    median: number;
    totalTickets: number;
  }>;
  overallMedian: number;
  startDate: string;
  endDate: string;
}
```

## Business Logic

### Time Calculations

- All time-based calculations consider:
  - Workspace timezone
  - Business hours configuration
  - Non-working days
  - Holiday schedules

### Median Calculations

- Uses standard median calculation for response and resolution times
- Excludes outliers and invalid data points
- Considers only completed tickets for resolution time

## Error Handling

- API endpoints include comprehensive error handling
- Client-side error messages for failed data fetches
- Validation of date ranges and query parameters
- Graceful fallbacks for missing data

## Security

- All endpoints protected with workspace authentication
- Input validation using Zod schemas
- Rate limiting on API endpoints
- Data access restricted to authorized workspace members

## Performance Considerations

- Efficient data aggregation on the server
- Client-side caching of historical data
- Optimized chart rendering
- Lazy loading of components

## Usage Examples

### Fetching Queue Size Data

```typescript
const response = await axios.get(`${NEXT_PUBLIC_API_URL}/insights/queue-size`, {
  params: {
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
});
```

### Updating Insights Store

```typescript
const { insightsStore } = useStores();
await getQueueSize();
// Data automatically updates in the store
```

## Best Practices

1. Always validate date ranges before making API calls
2. Handle loading states appropriately
3. Implement error boundaries for chart components
4. Cache frequently accessed data
5. Use appropriate timezone conversions

## Troubleshooting

- Check workspace configuration for correct timezone settings
- Verify business hours are properly configured
- Ensure proper authentication tokens are present
- Monitor API response times for performance issues

## Future Enhancements

1. Custom metric definitions
2. Export functionality for reports
3. Real-time updates via WebSocket
4. Advanced filtering options
5. Custom visualization types
