import React from 'react';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getElevationData, clearPins } from './store/actions';

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

const GetElevationProfileButton = ({ getElevationData, disabled }) => {
  return (
    <StyledButton
      onClick={getElevationData}
      disabled={disabled}
      id="get-elevation-profile-button"
    >
      Get my elevation profile
    </StyledButton>
  );
};

const ClearPinsButton = ({ disabled, clearPins }) => (
  <StyledClearButton onClick={clearPins} disabled={disabled} id="clear-button">
    Clear pins
  </StyledClearButton>
);
const Buttons = ({ getElevationData, clearPins, hasPins, submitting }) => {
  const disabled = !hasPins || submitting;
  return (
    <StyledButtons>
      <GetElevationProfileButton
        getElevationData={getElevationData}
        submitting={submitting}
        disabled={disabled}
      />
      {hasPins && <ClearPinsButton clearPins={clearPins} disabled={disabled} />}
    </StyledButtons>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getElevationData: () => dispatch(getElevationData()),
    clearPins: () => dispatch(clearPins()),
  };
};

const mapStateToProps = state => {
  return {
    submitting: state.submitting,
    hasPins: state.pins.length > 0,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
