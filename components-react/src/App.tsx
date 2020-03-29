import React from 'react';
import './App.css';
import Modal from './Modal';
import DraggableModal from "./DraggableModal";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Modal>
        Hello
      </Modal>
      <DraggableModal>
        Hello
      </DraggableModal>
      <Calendar />
    </div>
  );
}

export default App;
