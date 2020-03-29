import React, {MutableRefObject, useEffect, useReducer, useRef, useState} from "react";

const reducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'showCalendar':
      return {
        ...prevState,
        left: action.offsetLeft,
        top: action.offsetTop + action.offsetHeight,
        show: true,
      };
    case 'hideCalendar':
      return {
        ...prevState,
        show: false,
      };
    case 'previous':
      if (prevState.month === 0) {
        return {
          ...prevState,
          year: prevState.year-1,
          month: 11,
        }
      }
      return {
        ...prevState,
        month: prevState.month - 1,
      };
    case 'next':
      if (prevState.month === 11) {
        return {
          ...prevState,
          year: prevState.year+1,
          month: 0,
        }
      }
      return {
        ...prevState,
        month: prevState.month+1,
      };
    case 'setValue':
      return {
        ...prevState,
        value: action.value,
      }
  }
  return defaultState;
};

const defaultState = { left: 0, top: 0, show: false, value: ''};

const Calendar: React.FC = ({ children }) => {
  let currentYear = (new Date()).getFullYear();
  let currentMonth = (new Date()).getMonth();
  const inputRef = useRef() as MutableRefObject<any>;
  const funcRef = useRef() as MutableRefObject<(e: MouseEvent) => void>;
  const modalRef = useRef() as MutableRefObject<any>;

  useEffect(() => {
    funcRef.current = (e: MouseEvent) => {
      if (inputRef.current && inputRef.current.contains(e.target)) {
        return;
      }
      if (modalRef.current && modalRef.current.contains(e.target)) {
        return;
      }
      dispatch({ type: 'hideCalendar' });
      document.removeEventListener('click', funcRef.current);
    };
  }, []);

  const onFocus = (e: React.FocusEvent) => {
    dispatch({ type: 'showCalendar', left: inputRef.current.offsetLeft, top: inputRef.current.offsetTop, height: inputRef.current.offsetHeight});
    document.removeEventListener('click', funcRef.current);
    document.addEventListener('click', funcRef.current);
  };

  const [state, dispatch] = useReducer(reducer, { ...defaultState, year: currentYear, month: currentMonth });

  const onPrevious = (e: React.MouseEvent) => {
    dispatch({ type: 'previous' });
  };

  const onNext = (e: React.MouseEvent) => {
    dispatch({ type: 'next' });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setValue', value: e.target.value});
  };

  const firstDay = (new Date(state.year, state.month)).getDay();
  const createBlankDay = () => {
    const cols = [];
    for (let i = 0; i < firstDay; i++) {
      cols.push(<td key={`blank-${i}`}></td>)
    }
    return cols;
  };

  const rows = [];
  let row = createBlankDay();
  const days = 32 - new Date(state.year, state.month, 32).getDate();
  for (let i = 0; i < days; i++) {
    const onClick = (e: React.MouseEvent) => {
      dispatch({ type: 'setValue', value: `${state.year}-${(state.month+1).toString().padStart(2, '0')}-${(i+1).toString().padStart(2, '0')}`});
      dispatch({ type: 'hideCalendar'});
    };
    row.push(<td key={`day-${i}`} onClick={onClick}>{i+1}</td>);
    if ((i + firstDay) % 7 === 6) {
      rows.push(row);
      row = [];
    }
  }
  if (rows.length > 0) {
    rows.push(row);
  }

  return (
    <div>
      <input ref={inputRef} onChange={onChange} value={state.value} onFocus={onFocus} type="text" id="input-date" />
      <div ref={modalRef} className="calendar-ui" style={{display: state.show ? 'block' : 'none'}}>
        <div className="calendar-title">{state.year}-{(state.month+1).toString().padStart(2, '0')}</div>
        <div className="calendar-buttons">
          <button onClick={onPrevious}>&lt;</button>
          <button onClick={onNext}>&gt;</button>
        </div>
        <table>
          <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          </thead>
          <tbody id="calendar-ui-body">
          {rows.map((row, i) => <tr key={`week-${i}`}>{row}</tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Calendar;
