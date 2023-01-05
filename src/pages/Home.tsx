import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mt-5">Welcome</h1>
      <p className="mt-3">
        Decoder (aka Mastermind, aka Code breaker) is a classic game of deduction where you try to guess the
        correct hidden color combination. Choose your colors, then observe the
        hint given. The green number represents the number of colors that were on
        their right place, whereas the orange number represents correct colors in
        the wrong slot.
      </p>
      <p>
        There are two difficulties of the game; one with five color options and
        another with seven. For the easier mode, you have ten guesses to figure
        out the correct combination. For the more difficult version, you have
        12.
      </p>
      <p className="mt-3">
        This exercise contains multiple versions of the same game. All versions
        should look and work identical. Please click on a button to proceed:
      </p>
      <Stack direction="horizontal" gap={3} className="justify-content-center mt-3">
        <Button className="outline-primary" onClick={() => navigate('recoil/play')}>
          Recoil
        </Button>
        <Button className="outline-primary" onClick={() => navigate('redux/play')}>
          Redux
        </Button>
        <Button className="outline-primary" onClick={() => navigate('context/play')}>
          Context API
        </Button>
      </Stack>
    </>
  );
};
