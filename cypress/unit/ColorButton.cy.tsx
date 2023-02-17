import {ComponentType} from 'react';
import {ColorButton as ContextColorButton} from '@/components/context-api/ColorButton';
import {ColorButton as RecoilColorButton} from '@/components/recoil/ColorButton';
import {ColorButton as ReduxColorButton} from '@/components/redux/ColorButton';
import {Color, ColorButtonProps} from '@/types';

type ColorButtonTestProps = {
  name: string;
  ColorButton: ComponentType<ColorButtonProps>;
  mountFn: typeof cy.mount;
};

[
  {name: 'Context API', ColorButton: ContextColorButton, mountFn: cy.contextMount},
  {name: 'Recoil', ColorButton: RecoilColorButton, mountFn: cy.recoilMount},
  {name: 'Redux', ColorButton: ReduxColorButton, mountFn: cy.reduxMount},
].forEach(({name, ColorButton, mountFn}: ColorButtonTestProps) => {
  describe(`${name} <ColorButton/>`, () => {
    Object.entries(Color).forEach(([key, value]) => {
      it(`renders ${key}`, () => {
        mountFn(
          <ColorButton
            color={value}
            disabled={false}
            onChangeColor={() => false}
          />
        )
          .get('div[role="button"]')
          .should('contain.text', key);
      });
    });

    it('renders empty', () => {
      mountFn(
        <ColorButton
          color={'' as Color}
          disabled={false}
          onChangeColor={() => false}
        />
      )
        .get('div[role="button"]')
        .should('contain.text', 'Choose');
    });

    it('renders disabled', () => {
      mountFn(
        <ColorButton
          color={Color.Red}
          disabled={true}
          onChangeColor={() => false}
        />
      )
        .get('div[role="button"]')
        .should('contain.text', 'Red')
        .should('have.class', 'disabled');
    });

    it('changes color', () => {
      const changeColor = cy.spy().as('onChangeColorSpy');
      mountFn(
        <ColorButton
          color={Color.Black}
          disabled={false}
          onChangeColor={changeColor}
        />
      )
        .get('div[role="button"]')
        .should('contain.text', 'Black')
        .click()
        .get('.dropdown-menu.show')
        .find('a:first-child')
        .click()
        .get('@onChangeColorSpy')
        .should('have.been.calledWith', Color.Red);
    });
  });
});
