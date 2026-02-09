import type { Pos } from "src/types";

export const createCheckBoundsForResizeHandles = (parentTransform?: Pos) => {
  return (dragElem: HTMLElement, pos: Pos, _delta: Pos, boundElem?: HTMLElement | null): Pos => {
    if (!boundElem) {
      return pos;
    }

    const parentX = parentTransform?.x || 0;
    const parentY = parentTransform?.y || 0;

    const dragRect = dragElem.getBoundingClientRect();
    const newPos = Object.assign( {}, pos );

    // Account for parent transform when checking bounds
    if( parentX + pos.x - dragRect.width / 2 < 0 ){
      newPos.x = -parentX;
    }
    if( parentY + pos.y - dragRect.height / 2  < 0 ){
      newPos.y = -parentY;
    }
    if( parentX + pos.x - dragRect.width / 2 > boundElem.offsetWidth ){
      newPos.x = boundElem.offsetWidth - parentX;
    }
    if( parentY + pos.y - dragRect.height / 2 > boundElem.offsetHeight ){
      newPos.y = boundElem.offsetHeight - parentY;
    }

    return newPos;
  };
};
