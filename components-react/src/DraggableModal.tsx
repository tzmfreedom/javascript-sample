import React, {MutableRefObject, useEffect, useReducer, useRef, useState} from "react";

const reducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'setMouse':
      return {
        ...prevState,
        x: action.x,
        y: action.y,
      };
    case 'setPosition':
      const moveY = action.clientY - prevState.y;
      const moveX = action.clientX - prevState.x;
      return {
        ...prevState,
        x: action.clientX,
        y: action.clientY,
        offsetTop: prevState.offsetTop + moveY,
        offsetLeft: prevState.offsetLeft + moveX,
      };
  }
  return defaultState;
};

const defaultState = { x: 0, y: 0, offsetLeft: 100, offsetTop: 100};

const DraggableModal: React.FC = ({ children }) => {
  const funcRef = useRef() as MutableRefObject<(e: MouseEvent) => void>;
  // const funcRef2 = useRef() as MutableRefObject<(e: MouseEvent) => void>;
  const ref = useRef(null);
  useEffect(() => {
    funcRef.current = (e: MouseEvent) => {
      // @ts-ignore
      if (ref && ref.current && ref.current.contains(e.target)) {
        return;
      }
      setShow(false);
      document.removeEventListener('click', funcRef.current);
    };
  }, []);
  const [show, setShow] = useState(false);
  const onClick = (e: React.MouseEvent) => {
    setShow(true);
    document.removeEventListener('click', funcRef.current);
    document.addEventListener('click', funcRef.current);
  };

  const [state, dispatch] = useReducer(reducer, defaultState);
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'setMouse', x: e.clientX, y: e.clientY });

    const onMouseUp = () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
    const onMouseMove = (e: MouseEvent) => {
      dispatch({ type: 'setPosition', clientX: e.clientX, clientY: e.clientY })
    };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  return (
    <div className="Modal">
      <button onClick={onClick}>Open Modal</button>
      <div className="modal-background draggable-modal-background" style={{display: show ? 'block' : 'none'}}>
        <div ref={ref} onMouseDown={onMouseDown} className="modal-content draggable-modal-content" style={
          {left: state.offsetLeft, top: state.offsetTop, width: '300px', height: '200px'}}>
          <div className="draggable-modal-inner-content" style={{position: 'relative', height: 'calc(100% - 30px)'}}>
            <div style={{margin: '30px auto', width: '100%'}}>Hello</div>
            <span id="modal-bootstrap"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DraggableModal;

