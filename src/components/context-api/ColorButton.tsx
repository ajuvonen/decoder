import Dropdown from 'react-bootstrap/Dropdown';
import { useGameContext } from '@/context/GameContext';
import { Color, ColorButtonProps } from '@/types';
import { ColorDropdownItem, ColorToggle } from '../StyledDropdown';

export const ColorButton = ({ color, onChangeColor, disabled }: ColorButtonProps) => {
  const { currentGame } = useGameContext();
  const colorName = Object.keys(Color)[Object.values(Color).indexOf(color)] || 'Choose';
  return (
    <Dropdown>
      <Dropdown.Toggle as={ColorToggle} role="button" color={color} disabled={disabled} className={disabled ? 'disabled' : ''}>{colorName}</Dropdown.Toggle>
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
