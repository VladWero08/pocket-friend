# Warning System Documentation

## Overview
The warning system monitors user mental health indicators and displays alerts when warnings are detected.

## Features

### 1. Automatic Warning Polling
- ✅ Polls warnings endpoint every **5 seconds**
- ✅ Checks for user-specific warnings
- ✅ Automatically updates warning count
- ✅ Cleans up polling on component unmount

### 2. Warning Button
- ✅ **Shape**: Small yellow triangle (pointing up)
- ✅ **Position**: Fixed in top-right corner, below navbar
- ✅ **Color**: Yellow (#fbbf24) with glow effect
- ✅ **Icon**: Warning emoji (⚠️) centered on triangle
- ✅ **Animation**: Pulsing glow to attract attention
- ✅ **Visibility**: Only shown when warnings exist

### 3. Mental Health Popup
- ✅ Opens when warning button is clicked
- ✅ Displays mental health resources
- ✅ Shows crisis hotline and therapist links
- ✅ Can be closed to return to home screen

## Technical Implementation

### Polling Logic

```javascript
useEffect(() => {
    if (!userId) return;

    const fetchWarnings = async () => {
        const response = await getUserWarnings(userId);
        if (response.success && response.data.length > 0) {
            setWarnings(response.data);
        } else {
            setWarnings([]);
        }
    };

    // Fetch immediately
    fetchWarnings();

    // Poll every 5 seconds
    const intervalId = setInterval(fetchWarnings, 5000);

    // Cleanup
    return () => clearInterval(intervalId);
}, [userId]);
```

### Warning Button Rendering

```javascript
{warnings.length > 0 && (
    <button 
        className="warning-button"
        onClick={() => setShowWarningPopup(true)}
        title={`${warnings.length} warning${warnings.length > 1 ? 's' : ''}`}
    >
    </button>
)}
```

Note: The warning icon (⚠️) is added via CSS `::before` pseudo-element

### Popup Management

```javascript
{showWarningPopup && (
    <MentalHealthPopup onClose={() => setShowWarningPopup(false)} />
)}
```

## API Integration

### Endpoint
**GET** `/api/chats/warnings?user_id={userId}`

### Response Format
```json
{
  "success": true,
  "message": "user chat fetched",
  "data": [
    {
      "id": 1,
      "name": "Depression",
      "message": "User shows signs of depression"
    },
    {
      "id": 2,
      "name": "Anxiety",
      "message": "User shows signs of anxiety"
    }
  ]
}
```

### Empty State
```json
{
  "success": true,
  "message": "user chat fetched",
  "data": []
}
```

## Styling

### Warning Button (Triangle Shape)
```scss
.warning-button {
  position: fixed;
  top: 80px;
  right: 24px;
  // CSS Triangle using borders
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid #fbbf24;
  // Warning icon
  &::before {
    content: '⚠️';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  z-index: 100;
  animation: pulse-warning 2s infinite;
}
```

### Pulsing Animation
```scss
@keyframes pulse-warning {
  0%, 100% {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
  }
  50% {
    box-shadow: 0 0 30px rgba(251, 191, 36, 0.9);
  }
}
```

## User Flow

```
Home Screen Loads
    ↓
Start polling warnings (every 5 seconds)
    ↓
Check for warnings
    ↓
Warnings found?
    ├─ YES → Show yellow warning button
    │         └─ User clicks button
    │             └─ Open Mental Health Popup
    │                 └─ User views resources
    │                     └─ User clicks close
    │                         └─ Return to home
    │
    └─ NO → Hide warning button
              └─ Continue polling
```

## States

### Component State
```javascript
const [warnings, setWarnings] = useState([]);        // Array of warnings
const [showWarningPopup, setShowWarningPopup] = useState(false);  // Popup visibility
```

### Polling State
- **Active**: When userId exists and component is mounted
- **Inactive**: When component unmounts or userId is null
- **Interval**: 5000ms (5 seconds)

## Visual Appearance

### Warning Button
```
┌─────────────────────┐
│ Top of Screen       │
├─────────────────────┤
│ Navbar              │
├─────────────────────┤
│                  ▲  │ ← Yellow Triangle (pulsing)
│                 ⚠️   │    with warning icon
│                     │
│ Chat Content        │
│                     │
└─────────────────────┘
```

### When Clicked
```
┌─────────────────────────────┐
│ Mental Health Popup (Center)│
│                             │
│ ♥ MENTAL HEALTH             │
│                             │
│ Resources...                │
│                             │
│ [CLOSE]                     │
└─────────────────────────────┘
```

## Performance Considerations

1. **Polling Frequency**: 5 seconds balances responsiveness with API load
2. **Cleanup**: Interval is cleared on unmount to prevent memory leaks
3. **Conditional Rendering**: Button only renders when warnings exist
4. **Error Handling**: Failed API calls don't break the UI

## Future Enhancements

- Add sound/notification when new warning appears
- Show warning details in button tooltip
- Add different warning severity levels (low/medium/high)
- Add warning history tracking
- Add ability to dismiss warnings
- Add warning categories with different colors

