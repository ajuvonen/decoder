import {useGameContext} from '@/context/GameContext';
import {Color} from '@/types';
import {useEffect} from 'react';

const TestComponent = () => {
  const {currentGame, setCurrentGame, stats, setStats, settings, setSettings} =
    useGameContext();
  useEffect(() => {
    setCurrentGame({
      active: true,
      hardMode: true,
      maxGuesses: 12,
      started: new Date('2023/01/31 0:00:00 GMT+0200').getTime() ,
      combination: [Color.Black, Color.Black, Color.Blue, Color.Red],
      guesses: [
        {
          round: 1,
          combination: [Color.Orange, Color.Yellow, Color.Purple, Color.Green],
          result: {correct: 0, semiCorrect: 0},
        },
      ],
    });
    setStats({
      won: 1,
      lost: 2,
      fastest: 123,
      fastestHardMode: 456,
    });
    setSettings({
      instructionShown: true,
    });
  }, [setCurrentGame, setStats, setSettings]);

  return (
    <div>
      <div>
        <div data-test="current-game-active">{currentGame.active.toString()}</div>
        <div data-test="current-game-hard-mode">{currentGame.hardMode.toString()}</div>
        <div data-test="current-game-max-guesses">{currentGame.maxGuesses}</div>
        <div data-test="current-game-started">{currentGame.started}</div>
        <div data-test="current-game-combination">
          {currentGame.combination.join(',')}
        </div>
        {currentGame.guesses.length && (
          <div data-test="current-game-guess">
            {currentGame.guesses[0].combination.join(',')}
          </div>
        )}
      </div>
      <div>
        <div data-test="stats-won">{stats.won}</div>
        <div data-test="stats-lost">{stats.lost}</div>
        <div data-test="stats-fastest">{stats.fastest}</div>
        <div data-test="stats-fastest-hard-mode">{stats.fastestHardMode}</div>
      </div>
      <div>
        <div data-test="settings-instruction-shown">{settings.instructionShown.toString()}</div>
      </div>
    </div>
  );
};

describe('Context', () => {
  it('sets and returns values', () => {
    cy.contextMount(<TestComponent />)
      .getByTestId('current-game-active').should('have.text', 'true')
      .getByTestId('current-game-hard-mode').should('have.text', 'true')
      .getByTestId('current-game-max-guesses').should('have.text', '12')
      .getByTestId('current-game-started').should('have.text', '1675116000000')
      .getByTestId('current-game-combination').should('have.text', '#2C3E50,#2C3E50,#0089D0,#EE4035')
      .getByTestId('current-game-guess').should('have.text', '#F37021,#FCB711,#6460AA,#7BC043')
      .getByTestId('stats-won').should('have.text', '1')
      .getByTestId('stats-lost').should('have.text', '2')
      .getByTestId('stats-fastest').should('have.text', '123')
      .getByTestId('stats-fastest-hard-mode').should('have.text', '456')
      .getByTestId('settings-instruction-shown').should('have.text', 'true');
  });
});
