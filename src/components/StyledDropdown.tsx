import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';

const ColorToggle = styled.div`
  width: 150px;
  height: 150px;
  background: ${(props) =>
    props.color ||
    'repeating-linear-gradient(-55deg, #222, #222 10px, #333 10px, #333 20px)'};
  color: white;
  border-radius: 6px;
  transition: 0.2s;
  font-size: 1.5rem;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: opacity(85%);
  }

  &.disabled {
    opacity: 80%;
    cursor: default;
    pointer-events: none;
  }

  &:after {
    content: none;
  }

  @media (max-width: 1000px) {
    height: 35px;
    width: 100%;
    line-height: initial;
    font-size: 1rem;
  }
`;

const ColorDropdownItem = styled(Dropdown.Item)`
  display: flex;
  align-items: center;
  color: #2C3E50;

  > span {
    border-radius: 6px;
    margin-right: 0.5rem;
    display: inline-block;
    width: 25px;
    height: 25px;
    background: ${(props) => props.color};
  }
`;

export {ColorToggle, ColorDropdownItem};
