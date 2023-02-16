import {useRecoilValue} from 'recoil';
import classNames from 'classnames';
import {useTranslation} from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import {Color, ColorButtonProps} from '@/types';
import {currentGameState} from '@/recoil-store';
import {ColorDropdownItem, ColorToggle} from '@/components/StyledDropdown';
import {getColor} from '@/utils/gameUtils';

export const ColorButton = ({
  color,
  onChangeColor,
  disabled,
}: ColorButtonProps) => {
  const currentGame = useRecoilValue(currentGameState);
  const {t} = useTranslation();
  const colorName = color ? getColor(color) : t('general.choose');
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={ColorToggle}
        role="button"
        color={color}
        className={classNames({disabled})}
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
