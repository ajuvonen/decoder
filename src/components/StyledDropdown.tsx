import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';

const ColorToggle = styled.div`
  width: 150px;
  height: 150px;
  background: ${(props) =>
    props.color ||
    'repeating-linear-gradient(-55deg,#222,#222 10px,#333 10px,#333 20px)'};
  color: white;
  border-radius: 6px;
  transition: 0.2s;
  font-size: 1.5rem;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    opacity: 80%;
    cursor: default;
    pointer-events: none;
  }

  &:not([disabled]):hover {
    filter: opacity(85%);
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

  > span {
    border-radius: 6px;
    margin-right: 0.5rem;
    display: inline-block;
    border: 1px solid #222;
    width: 25px;
    height: 25px;
    background: ${(props) => props.color};
  }
`;

export {ColorToggle, ColorDropdownItem};
