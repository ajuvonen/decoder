import { useRecoilValue } from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import { Color, ColorButtonProps } from '@/types';
import { currentGameState } from '@/recoil-store';
import { ColorDropdownItem, ColorToggle } from '../StyledDropdown';

export const ColorButton = ({ color, onChangeColor, disabled }: ColorButtonProps) => {
  const currentGame = useRecoilValue(currentGameState);
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
