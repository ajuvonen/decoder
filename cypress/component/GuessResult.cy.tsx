import {GuessResult} from '@/components/GuessResult';

describe('<GuessResult />', () => {
  it('displays correct numbers', () => {
    cy.mount(
      <GuessResult
        guess={{
          combination: [],
          result: {
            correct: 3,
            semiCorrect: 1,
          },
          round: 1,
        }}
        maxGuesses={10}
      />
    )
      .window().then((win) => {
        cy.getByTestId('guess-result').then((element) => {
          const after = win.getComputedStyle(element[0], '::after');
          cy.wrap(after.getPropertyValue('content')).should('eq', '"Round 1 / 10"');
        })
      })
      .getByTestId('guess-result-correct')
      .should('have.text', 3)
      .getByTestId('guess-result-semicorrect')
      .should('have.text', 1);
  });
});
