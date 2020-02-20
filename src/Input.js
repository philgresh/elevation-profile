import React from 'react';
import styled from 'styled-components';

const LatLonInputs = ({ state, onChangeSetState, onFormButtonClick }) => {
  return (
    <form>
      <fieldset>
        <legend>Manually enter a lat/lon pair</legend>
        <div className="input-left">
          <input
            name="lat0"
            value={state.lat0}
            onChange={e => onChangeSetState(e)}
            type="number"
            min="-90.00"
            max="90.00"
            step="0.000001"
          />
          <label htmlFor="lat0">Latitude</label>

          <input
            name="lon0"
            value={state.lon0}
            onChange={e => onChangeSetState(e)}
            type="number"
            min="-180.00"
            max="180.00"
            step="0.000001"
          />
          <label htmlFor="lon0">Longitude</label>
        </div>
        <div className="input-right">
          <input
            name="lat1"
            value={state.lat1}
            onChange={e => onChangeSetState(e)}
            type="number"
            min="-90.00"
            max="90.00"
            step="0.000001"
          />
          <label htmlFor="lat1">Latitude</label>

          <input
            name="lon1"
            value={state.lon1}
            onChange={e => onChangeSetState(e)}
            type="number"
            min="-180.00"
            max="180.00"
            step="0.000001"
          />
          <label htmlFor="lon1">Longitude</label>
        </div>
        <button onClick={e => onFormButtonClick(e)}>Get my elevation profile!</button>
      </fieldset>
    </form>
  );
};

// const

const Inputs = ({ state, onChangeSetState, onFormButtonClick }) => {
  return (
    <div>
      <LatLonInputs
        state={state}
        onChangeSetState={onChangeSetState}
        onFormButtonClick={onFormButtonClick}
      />
    </div>
  );
};

const StyledInputs = styled(Inputs)`
  legend {
    background-color: #000;
    color: #fff;
    padding: 3px 6px;
  }

  .output {
    font: 1rem 'Fira Sans', sans-serif;
  }

  input {
    margin: 0.4rem;
  }
`;

export default StyledInputs;
