# Queue Size Calculation Documentation

## Overview

The queue size metric is a key performance indicator that tracks the total number of open tickets in the system at any given point in time. This documentation explains how the queue size is calculated and visualized in the insights dashboard.

## Time Range

- **Default Range**: Last 30 days
- **Custom Range**: Users can specify custom `startDate` and `endDate` parameters
- **Data Points**: Daily snapshots of queue size

## Data Points Tracked

For each ticket, we track:

- Creation date (`created_at`)
- Current status (`status`)
- Last update date (`updated_at`)

## Calculation Methodology

### 1. Data Collection

```typescript
// Fetch all relevant tickets within the date range
const tickets = await prisma.ticket.findMany({
  where: {
    workspace_id: workspaceId,
    created_at: {
      gte: startOfDay(effectiveStartDate),
      lte: endOfDay(effectiveEndDate),
    },
  },
  select: {
    created_at: true,
    status: true,
    updated_at: true,
  },
});
```

### 2. Daily Change Calculation

The system calculates queue size changes on a daily basis:

1. **Ticket Creation**: +1 to queue size on the creation date
2. **Ticket Closure**: -1 from queue size on the closure date
3. **Running Total**: Maintains a cumulative sum of changes

### 3. Queue Size Formula

For any given day:

```
Queue Size = Previous Day's Queue Size + New Tickets Created - Tickets Closed
```

## Visualization

### Chart Details

- **Type**: Line chart with area fill
- **X-axis**: Dates (MMM dd format)
- **Y-axis**: Number of open tickets
- **Interactive Features**:
  - Hover tooltips showing exact values
  - Grid lines for readability
  - Responsive scaling

### Sample Chart Configuration

```typescript
const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
      title: { text: 'Number of Open Tickets' },
    },
    x: {
      title: { text: 'Date' },
    },
  },
};
```

## Data Structure

### Response Format

```typescript
interface QueueSizeResponse {
  data: QueueSizeData[]; // Daily queue size data
  startDate: string; // Range start date (ISO string)
  endDate: string; // Range end date (ISO string)
}

interface QueueSizeData {
  date: string; // Date (YYYY-MM-DD)
  queueSize: number; // Total open tickets
}
```

## Example Scenarios

### Scenario 1: Normal Day

- Starting queue size: 10
- New tickets: 3
- Closed tickets: 2
- End of day queue size: 11

### Scenario 2: High Volume Day

- Starting queue size: 15
- New tickets: 8
- Closed tickets: 3
- End of day queue size: 20

## Best Practices

### Reading the Data

1. Look for trends over time rather than individual daily fluctuations
2. Compare similar time periods (e.g., week over week)
3. Consider seasonal patterns or business cycles

### Interpreting Results

- **Increasing Trend**: May indicate growing workload or reduced resolution capacity
- **Decreasing Trend**: Could suggest improved efficiency or reduced incoming volume
- **Stable Line**: Indicates balanced workload management

## Technical Implementation

### API Endpoint

```typescript
GET / api / insights / queue - size;
```

### Query Parameters

- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string

### Error Handling

The system handles various edge cases:

- Invalid date ranges
- Missing data points
- Workspace authorization

## Maintenance and Updates

### Data Accuracy

- Queue size calculations are performed in real-time
- Historical data is preserved and accurate
- System accounts for timezone differences

### Performance Considerations

- Optimized database queries
- Efficient data structure for calculations
- Caching mechanisms for frequently accessed periods

## Support and Contact

For technical support or questions about the queue size calculation:

1. Check the API documentation
2. Contact the development team
3. Submit feature requests through the appropriate channels
