import React from 'react';
import styled from 'styled-components';

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

const GetElevationProfileButton = ({ getElevationDataOnClick, disabled }) => {
  return (
    <StyledButton
      onClick={getElevationDataOnClick}
      disabled={disabled}
      id="get-elevation-profile-button"
    >
      Get my elevation profile
    </StyledButton>
  );
};

const ClearPointsButton = ({ disabled, clearPointsOnClick }) => (
  <StyledClearButton
    onClick={clearPointsOnClick}
    disabled={disabled}
    id="clear-button"
  >
    Clear points
  </StyledClearButton>
);

export default GetElevationProfileButton;
export { ClearPointsButton, GetElevationProfileButton };
