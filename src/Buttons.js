/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Loading from 'react-simple-loading';
import styled from 'styled-components';
import { getElevationDataAction, clearPinsAction } from './store/actions';

const StyledButtons = styled.div`
  display: flex;
  position: fixed;
  flex-wrap: wrap;
  z-index: 5;
`;

const StyledButton = styled.button`
  flex: 2 1 auto;
  border: none;
  background: teal;
  color: white;
  font-size: 1rem;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0px 5px 5px 1px rgba(34, 34, 34, 0.5);
  -moz-box-shadow: 0px 5px 5px 1px rgba(34, 34, 34, 0.5);
  box-shadow: 0px 5px 5px 1px rgba(34, 34, 34, 0.5);
  cursor: pointer;
  &:hover {
    background-color: #006464;
  }
`;

const StyledClearButton = styled(StyledButton)`
  flex: 1 1 auto;
  background-color: #ffffff;
  color: teal;
  &:hover {
    background-color: #dddddd;
    color: #004040;
  }
`;

const GetElevationProfileButton = ({
  getElevationData,
  submitting,
  numPins,
}) => {
  let disabled = submitting;
  let buttonText = (
    <>
      <strong>Get my elevation profile!</strong>
      <br />
      Or click to add more points
    </>
  );
  if (numPins === 0) buttonText = 'Click anywhere to drop an endpoint';
  if (numPins === 1) {
    buttonText = 'Click anywhere to drop another endpoint';
    disabled = true;
  }
  return (
    <StyledButton
      disabled={disabled}
      onClick={getElevationData}
      id="get-elevation-profile-button"
    >
      {submitting ? <Loading /> : buttonText}
    </StyledButton>
  );
};

const ClearPinsButton = ({ disabled, clearPins }) => (
  <StyledClearButton onClick={clearPins} disabled={disabled} id="clear-button">
    Clear pins
  </StyledClearButton>
);

const Buttons = ({ getElevationData, clearPins, numPins, submitting }) => {
  const hasPins = numPins > 0;
  return (
    <StyledButtons>
      <GetElevationProfileButton
        getElevationData={getElevationData}
        submitting={submitting}
        numPins={numPins}
      />
      {hasPins && (
        <ClearPinsButton
          clearPins={clearPins}
          disabled={!hasPins || submitting}
        />
      )}
    </StyledButtons>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getElevationData: () => dispatch(getElevationDataAction()),
    clearPins: () => dispatch(clearPinsAction()),
  };
};

const mapStateToProps = state => {
  return {
    submitting: state.submitting,
    numPins: state.pins.length,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
