import {ComponentType} from 'react';
import {GuessRow as ContextGuessRow} from '@/components/context-api/GuessRow';
import {GuessRow as RecoilGuessRow} from '@/components/recoil/GuessRow';
import {GuessRow as ReduxGuessRow} from '@/components/redux/GuessRow';
import {Color, GuessRowProps, Result} from '@/types';

type GuessRowTestProps = {
  name: string;
  GuessRow: ComponentType<GuessRowProps>;
  mountFn: typeof cy.mount;
};

[
  {name: 'Context API', GuessRow: ContextGuessRow, mountFn: cy.contextMount},
  {name: 'Recoil', GuessRow: RecoilGuessRow, mountFn: cy.recoilMount},
  {name: 'Redux', GuessRow: ReduxGuessRow, mountFn: cy.reduxMount},
].forEach(({name, GuessRow, mountFn}: GuessRowTestProps) => {
  describe(`${name} <GuessRow/>`, () => {
    after(() => {
      cy.clearAllLocalStorage();
    });
  
    it('renders editable', () => {
      mountFn(
        <GuessRow
          guess={{
            result: {} as Result,
            combination: [],
            round: 1,
          }}
          disabled={false}
        />
      )
        .get('div[role="button"]').should('have.length', 4).each((element) => {
          cy.wrap(element).should('not.have.class', 'disabled');
        })
        .getByTestId('check-button').should('be.visible').should('be.disabled');
    });

    it('renders disabled', () => {
      mountFn(
        <GuessRow
          guess={{
            result: {
              correct: 3,
              semiCorrect: 1,
            },
            round: 1,
            combination: [Color.Red, Color.Green, Color.Blue, Color.Black],
          }}
          disabled={true}
        />
      )
        .get('div[role="button"]').should('have.length', 4).each((element) => {
          cy.wrap(element).should('have.class', 'disabled');
        })
        .getByTestId('check-button').should('not.exist')
        .getByTestId('guess-result').should('be.visible');
    });
  });
});
