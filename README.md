# useDrag

A React hook for adding drag functionality to HTML elements with optional boundary constraints.

## Features

- Simple drag-and-drop functionality for any HTML element
- Optional boundary constraints to keep elements within a container
- Custom boundary checking logic support
- Built-in "dragging" class for styling during drag operations
- Transform-based positioning (x, y coordinates)
- Reset functionality to return elements to initial position

## Installation

```bash
npm install
```

## API

### `useDrag(props: Props)`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dragElem` | `RefObject<HTMLElement>` | Yes | Reference to the element to be dragged |
| `boundElem` | `RefObject<HTMLElement>` | No | Reference to the boundary container element |
| `checkBounds` | `(dragElem: HTMLElement, pos: Pos, delta: Pos, boundElem?: HTMLElement \| null) => Pos` | No | Custom function to validate and constrain drag positions |

#### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `transform` | `Pos` | Current position object with `x` and `y` coordinates |
| `reset` | `() => void` | Function to reset the element to its initial position (0, 0) |

#### Types

```typescript
interface Pos {
  x: number;
  y: number;
}
```

## Usage

### Basic Dragging

```tsx
import { useRef } from 'react';
import useDrag from './useDrag';

function App() {
  const dragRef = useRef<HTMLDivElement>(null);

  const { transform } = useDrag({
    dragElem: dragRef
  });

  return (
    <div
      ref={dragRef}
      style={{
        transform: `translateX(${transform.x}px) translateY(${transform.y}px)`
      }}
    >
      Drag me!
    </div>
  );
}
```

### With Boundary Constraints

```tsx
import { useRef } from 'react';
import useDrag from './useDrag';
import checkBounds from './checkBounds';

function App() {
  const dragRef = useRef<HTMLDivElement>(null);
  const boundRef = useRef<HTMLDivElement>(null);

  const { transform } = useDrag({
    dragElem: dragRef,
    boundElem: boundRef,
    checkBounds: checkBounds
  });

  return (
    <div ref={boundRef} style={{ width: 500, height: 500 }}>
      <div
        ref={dragRef}
        style={{
          transform: `translateX(${transform.x}px) translateY(${transform.y}px)`
        }}
      >
        Drag me within bounds!
      </div>
    </div>
  );
}
```

### With Reset Functionality

```tsx
import { useRef } from 'react';
import useDrag from './useDrag';

function App() {
  const dragRef = useRef<HTMLDivElement>(null);

  const { transform, reset } = useDrag({
    dragElem: dragRef
  });

  return (
    <>
      <div
        ref={dragRef}
        style={{
          transform: `translateX(${transform.x}px) translateY(${transform.y}px)`
        }}
      >
        Drag me!
      </div>
      <button onClick={reset}>Reset Position</button>
    </>
  );
}
```

### Dragging Images with object-position

```tsx
import { useRef } from 'react';
import useDrag from './useDrag';
import checkBgBounds from './checkBgBounds';

function App() {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { transform, reset } = useDrag({
    dragElem: imageRef,
    boundElem: containerRef,
    checkBounds: checkBgBounds
  });

  return (
    <div ref={containerRef} style={{ width: 400, height: 300 }}>
      <img
        ref={imageRef}
        src="image.jpg"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `${transform.x}px ${transform.y}px`
        }}
      />
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Custom Boundary Checking

You can provide a custom `checkBounds` function to implement your own boundary logic:

```tsx
import type { Pos } from './types';

const customCheckBounds = (
  dragElem: HTMLElement,
  pos: Pos,
  delta: Pos,
  boundElem?: HTMLElement | null
): Pos => {
  // Your custom boundary logic here
  // Return the validated position
  return pos;
};

const { transform } = useDrag({
  dragElem: dragRef,
  boundElem: boundRef,
  checkBounds: customCheckBounds
});
```

## How It Works

1. The hook attaches `mousedown`, `mousemove`, and `mouseup` event listeners to track drag operations
2. During drag, the element receives a `dragging` CSS class
3. The hook calculates the new position based on mouse movement
4. If `checkBounds` is provided, the position is validated before being applied
5. The `transform` state is updated with the new x, y coordinates
6. Apply the transform to your element's style to see the drag effect

## CSS Styling

The hook automatically adds a `dragging` class to the element being dragged, which you can use for styling:

```css
.dragme {
  cursor: grab;
  transition: transform 0.1s;
}

.dragme.dragging {
  cursor: grabbing;
  transition: none;
}
```
