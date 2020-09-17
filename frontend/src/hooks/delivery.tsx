import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../service/api';

interface IDelivery {
  _id: string;
  name: string;
  weight: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    geolocation: {
      latitude: number;
      longitude: number;
    };
  };
}

interface IDeliveryContextData {
  deliveries: IDelivery[];
  createDelivery(delivery: Omit<IDelivery, '_id'>): Promise<void>;
  deleteDelivery(id: string): void;
  resetDelivery(): void;
}

const DeliveryContext = createContext<IDeliveryContextData>(
  {} as IDeliveryContextData,
);

const DeliveryProvider: React.FC = ({ children }) => {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);

  useEffect(() => {
    const deliveriesApi = async (): Promise<IDelivery[]> => {
      await api.get<IDelivery[]>(`/`).then(response => {
        setDeliveries(response.data);
      });

      return {} as Promise<IDelivery[]>;
    };

    deliveriesApi();
  }, []);

  const createDelivery = useCallback(
    async (delivery: Omit<IDelivery, '_id'>) => {
      await api.post<IDelivery>('/', delivery).then(response => {
        const newDelivery = response.data;

        setDeliveries([...deliveries, { ...newDelivery }]);
      });
    },
    [deliveries],
  );

  const deleteDelivery = useCallback(
    async (id: string) => {
      await api.delete(`/${id}`);

      setDeliveries(
        deliveries.filter(delivery => {
          if (delivery._id !== id) {
            return delivery;
          }
        }),
      );
    },
    [deliveries],
  );

  const resetDelivery = useCallback(async () => {
    await api.delete('/');
    setDeliveries([]);
  }, []);

  return (
    <DeliveryContext.Provider
      value={{ deliveries, createDelivery, deleteDelivery, resetDelivery }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

function useDelivery(): IDeliveryContextData {
  const context = useContext(DeliveryContext);

  if (!context) {
    throw new Error('useDelivery must be used within an DeliveryProvider');
  }

  return context;
}

export { DeliveryProvider, useDelivery };
