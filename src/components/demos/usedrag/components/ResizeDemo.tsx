import { useRef } from 'react';
import useDrag from 'demos/usedrag/useDrag';
import Resize from 'demos/usedrag/Resize';
import PageSubHeading from 'src/components/general/PageSubHeading';

function ResizeDemo() {
  const dragResizeRef = useRef<HTMLImageElement>( null );
  const boundResizeRef = useRef<HTMLDivElement>( null );

  const {
    transform: transformResize,
  } = useDrag({
    dragElem: dragResizeRef,
    boundElem: boundResizeRef,
  });

  const transformResizeString = transformResize ? `translateX(${transformResize.x}px) translateY(${transformResize.y}px)` : undefined;

  return (
    <div className="group">
      <PageSubHeading>Resize using Drag Handles</PageSubHeading>
      <div
        className="mt-2"
        ref={dragResizeRef}
        style={{
          width: 200,
          height: 200,
          transform: transformResizeString,
        }}
      >
        <Resize
          resizemeStyles={{
            width: 200,
            height: 200,
          }}
        >
          <div>Resize Me</div>
        </Resize>
      </div>
    </div>
  );
}

export default ResizeDemo;
