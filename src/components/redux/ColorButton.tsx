import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import { Color } from '@/types';
import { useSelector } from '@/hooks/reduxHooks';

const ColorToggle = styled(Dropdown.Toggle)`
  width: 150px;
  height: 150px;
  background: ${props => props.color || 'repeating-linear-gradient(-55deg,#222,#222 10px,#333 10px,#333 20px)'} !important;
  color: white !important;
  border-color: #222 !important;
  transition: 0.2s;
  font-size: 1.5rem;

  &[disabled] {
    opacity: 80%;
  }
  
  &:hover {
    filter: opacity(90%);
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
    background: ${props => props.color};
  }
`;

type ColorButtonProps = {
  color: Color,
  disabled: boolean,
  onChangeColor: (color: Color) => void,
};

export const ColorButton = ({ color, onChangeColor, disabled }: ColorButtonProps) => {
  const currentGame = useSelector((state) => state.currentGame);
  const colorName = Object.keys(Color)[Object.values(Color).indexOf(color)] || 'Choose';
  return (
    <Dropdown>
      <ColorToggle color={color} disabled={disabled}>{colorName}</ColorToggle>
      <Dropdown.Menu>
        <>
          {Object.entries(Color).slice(0, currentGame.hardMode ? undefined : 5).map(([key, value]) =>
            <ColorDropdownItem color={value} key={key} onClick={() => onChangeColor(value)}>
              <span aria-hidden></span>
              {key}
            </ColorDropdownItem>)
          }
        </>
      </Dropdown.Menu>
    </Dropdown>
  );
};
