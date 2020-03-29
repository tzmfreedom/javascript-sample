import React, {MutableRefObject, useEffect, useRef, useState} from "react";

const Modal: React.FC = ({ children }) => {
  const ref = useRef(null);
  const funcRef = useRef() as MutableRefObject<(e: MouseEvent) => void>;
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

  return (
    <div className="Modal">
      <button onClick={onClick}>Open Modal</button>
      <div className="modal-background" style={{display: show ? 'block' : 'none'}}>
        <div className="modal-content" ref={ref} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
