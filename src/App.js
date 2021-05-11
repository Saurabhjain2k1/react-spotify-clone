import React from "react";
import './App.css';
import { DataLayer } from "./context/DataLayer";
import Layout from './Layout'
import reducer, { initialState } from "./reducers/reducer";
import { SoundProvider } from "./context/SoundProvider";
import soundReducer, { soundInitialState } from "./reducers/soundReducer";
function App() {

  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <SoundProvider initialState={soundInitialState} reducer={soundReducer}>
        <Layout />
      </SoundProvider>
    </DataLayer>
    
  );
}

export default App;
