import {useTranslation} from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import {useGameContext} from '@/context/GameContext';
import {Color, ColorButtonProps} from '@/types';
import {ColorDropdownItem, ColorToggle} from '@/components/StyledDropdown';
import {getColor} from '@/utils/gameUtils';

export const ColorButton = ({
  color,
  onChangeColor,
  disabled,
}: ColorButtonProps) => {
  const {currentGame} = useGameContext();
  const {t} = useTranslation();
  const colorName = color ? getColor(color) : t('general.choose');
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={ColorToggle}
        role="button"
        color={color}
        disabled={disabled}
        className={disabled ? 'disabled' : ''}
      >
        {colorName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <>
          {Object.entries(Color)
            .slice(0, currentGame.hardMode ? undefined : 5)
            .map(([key, value]) => (
              <ColorDropdownItem
                color={value}
                key={key}
                onClick={() => onChangeColor(value)}
              >
                <span aria-hidden></span>
                {t(`general.colors.${key}`)}
              </ColorDropdownItem>
            ))}
        </>
      </Dropdown.Menu>
    </Dropdown>
  );
};
