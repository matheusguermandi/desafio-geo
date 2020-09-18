import React, { useCallback, useMemo, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { useDelivery } from '../../hooks/delivery';
import { usePosition } from '../../hooks/position';

import { Container } from './styles';

const Table: React.FC = () => {
  const { deliveries, deleteDelivery } = useDelivery();

  const { updatePosition } = usePosition();

  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const tiket = useMemo(() => {
    const customers = deliveries.reduce(accumulator => {
      return accumulator + 1;
    }, 0);

    setTotalCustomer(customers);

    const weight = deliveries.reduce((accumulator, extra) => {
      return accumulator + Number(extra.weight);
    }, 0);

    setTotalWeight(weight);

    return customers > 0 ? weight / customers : 0;
  }, [deliveries]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm('Atenção ... Deseja excluir esse cadastro?')) {
        deleteDelivery(id);
      }
    },
    [deleteDelivery],
  );

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Total de cliente</th>
            <th>Peso Total</th>
            <th>Ticket Médio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{totalCustomer}</th>
            <th>{totalWeight}</th>
            <th>{tiket}</th>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rua</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Peso</th>
            <th>Lat</th>
            <th>Lng</th>
            <th style={{ color: 'red' }}> IR </th>
            <th style={{ color: 'red' }}> X </th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery._id}>
              <th>{delivery.name}</th>
              <th>{delivery.address.street}</th>
              <th>{delivery.address.city}</th>
              <th>{delivery.address.country}</th>
              <th>{delivery.weight}</th>
              <th>{delivery.address.geolocation.latitude.toFixed(3)}</th>
              <th>{delivery.address.geolocation.longitude.toFixed(3)}</th>
              <th>
                <button
                  type="button"
                  onClick={() => updatePosition(delivery.address.geolocation)}
                >
                  <GoLocation size={17} />
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => handleDelete(delivery._id)}
                >
                  <FiTrash size={17} />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
