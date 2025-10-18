# Feed Drawer Component

## Overview

The Feed Drawer is a responsive component that allows users to manage their favorite categories, authors, and sources in the news application. It provides different user experiences for mobile and desktop devices.

## Features

### Mobile Design

- **Slide-out Drawer**: Opens from the right side of the screen
- **Full Overlay**: Dark overlay covers the entire screen when drawer is open
- **Interactive Lists**: Users can tap to toggle favorites for:
  - Categories (General, Business, Technology, Entertainment, Health, Science, Sports)
  - Authors (Based on available article authors)
  - Sources (News sources like CNN, BBC, Politico, etc.)
- **Visual Feedback**: Active favorites show with a heart icon and blue highlighting
- **Easy Dismissal**: Close button and overlay click to dismiss

### Desktop Design

- **Dropdown Menu**: Opens below the Feed button
- **Compact Summary**: Shows counts and lists of current favorites
- **Tag Display**: Favorites displayed as small tags
- **Auto-close**: Clicks outside the menu close it automatically

## Implementation Details

### Components

- `Drawer`: Main drawer component handling both mobile and desktop layouts
- `Feed`: Button component that triggers the drawer

### State Management

- **Redux Slice**: `favoritesSlice` manages the favorite selections
- **Actions**: `toggleFavoriteCategory`, `toggleFavoriteAuthor`, `toggleFavoriteSource`
- **Persistence**: State is maintained in Redux store

### Responsive Behavior

- **Mobile (< 1024px)**: Full drawer overlay with slide animation
- **Desktop (≥ 1024px)**: Dropdown menu with hover states
- **Body Lock**: Prevents scrolling on mobile when drawer is open

### Styling

- **SCSS Modules**: Component-specific styling with responsive breakpoints
- **Animations**: Smooth transitions for open/close states
- **Accessibility**: ARIA labels and keyboard navigation support

## Usage

```tsx
import { Feed } from './components/feed'

// The Feed component handles all drawer functionality
;<Feed />
```

## Testing

The component includes comprehensive unit tests covering:

- State management (Redux slice tests)
- User interactions (click handlers, toggle functionality)
- Responsive behavior
- Accessibility features

Run tests with:

```bash
npm run test -- --testPathPatterns="(Drawer|favoritesSlice)"
```

## File Structure

```
src/
├── components/
│   ├── drawer/
│   │   ├── Drawer.tsx       # Main drawer component
│   │   ├── Drawer.scss      # Responsive styling
│   │   └── index.ts         # Export file
│   └── feed/
│       ├── Feed.tsx         # Feed button with drawer integration
│       └── Feed.scss        # Button styling
└── redux/
    └── features/
        └── favorites/
            └── favoritesSlice.ts  # State management
```
