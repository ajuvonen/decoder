import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import {Color, ColorButtonProps} from '@/types';
import {useSelector} from '@/hooks/reduxHooks';
import {ColorDropdownItem, ColorToggle} from '@/components/StyledDropdown';
import {getColor} from '@/utils/gameUtils';

export const ColorButton: FC<ColorButtonProps> = ({
  color,
  onChangeColor,
  disabled,
}) => {
  const currentGame = useSelector((state) => state.currentGame);
  const {t} = useTranslation();
  const colorName = color ? getColor(color) : t('general.choose');
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={ColorToggle}
        role="button"
        color={color}
        className={classNames({disabled}, 'tektur')}
      >
        {colorName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <>
          {Object.entries(Color)
            .slice(0, currentGame.hardMode ? undefined : 5)
            .map(([key, value]) => (
              <ColorDropdownItem
                className="tektur"
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
