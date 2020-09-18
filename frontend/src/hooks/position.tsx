import React, { createContext, useCallback, useContext, useState } from 'react';

interface IPosition {
  latitude: number;
  longitude: number;
}

interface IPositionContextData {
  position: IPosition;
  updatePosition(newPosition: IPosition): void;
}

const PositionContext = createContext<IPositionContextData>(
  {} as IPositionContextData,
);

const PositionProvider: React.FC = ({ children }) => {
  const [position, setPosition] = useState<IPosition>({
    latitude: -20.4028012,
    longitude: -49.9788157,
  });

  const updatePosition = useCallback((newPosition: IPosition) => {
    setPosition(newPosition);
  }, []);

  return (
    <PositionContext.Provider
      value={{
        position,
        updatePosition,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};

function usePosition(): IPositionContextData {
  const context = useContext(PositionContext);

  if (!context) {
    throw new Error('usePosition must be used within an PositionProvider');
  }

  return context;
}

export { PositionProvider, usePosition };
