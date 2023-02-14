import {ComponentType, useState} from 'react';
import {move} from 'ramda';
import Stack from 'react-bootstrap/Stack';
import classNames from 'classnames';
import styled from 'styled-components';
import {Color, ColorButtonProps} from '@/types';
import {useWindowSize} from '@/hooks/windowSize';

type DraggableListProps = {
  list: Color[];
  setList: React.Dispatch<React.SetStateAction<Color[]>>;
  ButtonComponent: ComponentType<ColorButtonProps>;
  disabled: boolean;
};

const DraggableItem = styled.div`
  position: relative;

  &.target:before {
    content: '';
    position: absolute;
    border: 2px solid #2C3E50;
    border-radius: 4px;
    left: -10px;
    top: 10px;
    bottom: 10px;
  }

  &.target:after {
    content: '';
    position: absolute;
    border: 2px solid #2C3E50;
    border-radius: 4px;
    right: -10px;
    top: 10px;
    bottom: 10px;
  }
`;

export const DraggableList = ({
  list,
  setList,
  ButtonComponent,
  disabled,
}: DraggableListProps) => {
  const [dragIndex, setDragIndex] = useState(0);
  const [dragOverIndex, setDragOverIndex] = useState(0);
  const vertical = useWindowSize().width <= 1000;

  const handleChangeColor = (index: number) => (color: Color) => {
    setList((current) => [
      ...current.slice(0, index),
      color,
      ...current.slice(index + 1),
    ]);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (dragIndex != dragOverIndex) {
      setList((current) => move(dragIndex, dragOverIndex, current));
      setDragIndex(dragOverIndex);
    }
  };

  return (
    <Stack
      direction={vertical ? 'vertical' : 'horizontal'}
      gap={vertical ? 1 : 3}
      className="mt-3 justify-content-center"
    >
      {disabled
        ? list.map((color, index) => (
            <ButtonComponent
              key={index}
              color={color}
              disabled
              onChangeColor={handleChangeColor(index)}
            />
          ))
        : list.map((color, index) => (
            <DraggableItem
              key={index}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => setDragOverIndex(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              draggable
              data-test={`draggable-item-${index}`}
              className={classNames({
                'target':
                  dragOverIndex === index && dragOverIndex !== dragIndex,
              })}
            >
              <ButtonComponent
                color={color}
                disabled={disabled}
                onChangeColor={handleChangeColor(index)}
              />
            </DraggableItem>
          ))}
    </Stack>
  );
};
