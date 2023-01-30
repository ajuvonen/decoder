import { ComponentType, useRef } from 'react';
import {move} from 'ramda';
import Stack from 'react-bootstrap/Stack';
import { Color, ColorButtonProps } from '@/types';
import { useWindowSize } from '@/hooks/windowSize';

type DraggableListProps = {
  list: Color[];
  setList: React.Dispatch<React.SetStateAction<Color[]>>;
  ButtonComponent: ComponentType<ColorButtonProps>;
  disabled: boolean;
};

export const DraggableList = ({
  list,
  setList,
  ButtonComponent,
  disabled,
}: DraggableListProps) => {
  const dragIndex = useRef(0);
  const dragOverIndex = useRef(0);
  const vertical = useWindowSize().width < 1000;

  const handleChangeColor = (index: number) => (color: Color) => {
    setList((current) => [
      ...current.slice(0, index),
      color,
      ...current.slice(index + 1),
    ]);
  };

  const handleDragStart = (index: number) => {
    dragIndex.current = index;
    dragOverIndex.current = index;
  };

  const handleDragEnter = (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragOverIndex.current = index
  };

  const handleDragEnd = () => {
    if (dragIndex.current != dragOverIndex.current) {
      setList((current) => move(dragIndex.current, dragOverIndex.current, current));
    }
  };

  return (
    <Stack
      direction={vertical ? 'vertical' : 'horizontal'}
      gap={vertical ? 1 : 3}
      className="mt-3 justify-content-center"
    >
      {list.map((color, index) => (
        <div
          key={index}
          onDragStart={() => handleDragStart(index)}
          onDragEnter={handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          draggable={!disabled}>
          <ButtonComponent
            color={color}
            disabled={disabled}
            onChangeColor={handleChangeColor(index)}
          />
        </div>
      ))}
    </Stack>
  );
};
