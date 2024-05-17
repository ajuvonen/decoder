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
      .getByTestId('guess-result-round')
      .should('have.text', 'Round 1 / 10')
      .getByTestId('guess-result-correct')
      .should('have.text', 3)
      .getByTestId('guess-result-semicorrect')
      .should('have.text', 1);
  });
});
