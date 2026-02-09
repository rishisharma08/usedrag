import { forwardRef, useLayoutEffect, useRef, useCallback, type PropsWithChildren, useEffect, type RefObject } from "react";
import useDrag from "demos/usedrag/useDrag";
import type { Dim, Pos } from "src/types";
import { createCheckBoundsForResizeHandles } from "../checkbounds/checkBoundsForResizeHandles";

interface Props extends PropsWithChildren{
  resizemeStyles?: React.CSSProperties,
  updateDims?: ( dimension: Dim ) => void,
  updateIsResizing?: ( isResizing: boolean, isResizingPrev: boolean ) => void,
  parentTransform?: Pos,
  parentRef?: RefObject<HTMLElement>
}
const Resize = forwardRef<HTMLDivElement, Props>( ( props, ref ) => {
  const dragTopRef = useRef<HTMLDivElement>( null );
  const dragBottomRef = useRef<HTMLImageElement>( null );
  const dragLeftRef = useRef<HTMLDivElement>( null );
  const dragRightRef = useRef<HTMLImageElement>( null );
  // const drag3Ref = useRef<HTMLImageElement>( null );
  const boundRef = useRef<HTMLDivElement>( null );

  // Combine both refs
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    boundRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  const {
    transform: transformTop,
    isDragging: isDraggingTop,
  } = useDrag({
    dragElem: dragTopRef,
    boundElem: props.parentRef,
    checkBounds: createCheckBoundsForResizeHandles(props.parentTransform),
    allowedDirections: [ "y" ],
  });
  const {
    transform: transformBottom,
    isDragging: isDraggingBottom,
  } = useDrag({
    dragElem: dragBottomRef,
    boundElem: props.parentRef,
    checkBounds: createCheckBoundsForResizeHandles(props.parentTransform),
    allowedDirections: [ "y" ],
  });
  const {
    transform: transformLeft,
    isDragging: isDraggingLeft,
  } = useDrag({
    dragElem: dragLeftRef,
    boundElem: props.parentRef,
    checkBounds: createCheckBoundsForResizeHandles(props.parentTransform),
    allowedDirections: [ "x" ],
  });
  const {
    transform: transformRight,
    isDragging: isDraggingRight,
  } = useDrag({
    dragElem: dragRightRef,
    boundElem: props.parentRef,
    checkBounds: createCheckBoundsForResizeHandles(props.parentTransform),
    allowedDirections: [ "x" ],
  });

  const {updateDims, updateIsResizing} = props;

  const isDraggingPrev = useRef<boolean>( isDraggingTop || isDraggingLeft || isDraggingRight || isDraggingBottom );

  useEffect(()=>{
    const newIsDragging = isDraggingTop || isDraggingLeft || isDraggingRight || isDraggingBottom;
    if( updateIsResizing ){
      updateIsResizing( newIsDragging, isDraggingPrev.current );
    }
    isDraggingPrev.current = newIsDragging;
  }, [isDraggingTop, isDraggingLeft, isDraggingRight, isDraggingBottom, updateIsResizing]);

  const transformTopString = transformTop ? `translateX(${transformTop.x}px)` : "";
  const transformBottomString = transformBottom ? `translateX(${transformBottom.x}px)` : `${( props?.resizemeStyles?.height ? `translateY(${props?.resizemeStyles?.height}px)` : "" )}`;
  const transformLeftString = transformLeft ? `translateY(${transformLeft.y}px)` : "";
  const transformRightString = transformRight ? `translateY(${transformRight.y}px)` : `${( props?.resizemeStyles?.width ? `translateX(${props?.resizemeStyles?.width}px)` : "" )}`;

  const height = ( transformBottom ? transformBottom.y : 0 ) - ( transformTop ? transformTop.y : 0 );
  const width = ( transformRight ? transformRight.x : 0 ) - ( transformLeft ? transformLeft.x : 0 );

  useLayoutEffect(()=>{
    if( updateDims ){
      updateDims({
        width,
        height,
        offsetX: transformLeft ? transformLeft.x : 0,
        offsetY: transformTop ? transformTop.y : 0
      });
    }
  }, [width, height, transformLeft?.x, transformTop?.y, updateDims]);

  // Combine parent transform with internal resize transforms
  const parentTransformString = props.parentTransform
    ? `translateX(${props.parentTransform.x}px) translateY(${props.parentTransform.y}px)`
    : '';
  const internalTransform = `translateY(${transformTop ? transformTop.y : 0}px) translateX(${transformLeft ? transformLeft.x : 0}px)`;
  const combinedTransform = `${parentTransformString} ${internalTransform}`.trim();

  return (
    <div
      className="resizeme"
      ref={setRefs}
      style={{
        ...(props.resizemeStyles || {}),
        height,
        width,
        transform: combinedTransform
      }}
    >
      {props.children}
      <div
        className="resizedragme-container resizedragme-top-container"
      >
        <div
          className="resizedragme resizedragme-top"
          ref={dragTopRef}
          style={{
            transform: transformTopString,
          }}
        ></div>
      </div>
      <div
        className="resizedragme-container resizedragme-bottom-container"
      >
        <div
          className="resizedragme resizedragme-bottom"
          ref={dragBottomRef}
          style={{
            transform: transformBottomString,
          }}
        ></div>
      </div>
      <div
        className="resizedragme-container resizedragme-left-container"
      >
        <div
          className="resizedragme resizedragme-left"
          ref={dragLeftRef}
          style={{
            transform: transformLeftString,
          }}
        ></div>
      </div>
      <div
        className="resizedragme-container resizedragme-right-container"
      >
        <div
          className="resizedragme resizedragme-right"
          ref={dragRightRef}
          style={{
            transform: transformRightString,
          }}
        ></div>
      </div>
    </div>
  );
});

export default Resize;