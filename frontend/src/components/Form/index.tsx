import React, { useCallback, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Client } from '@googlemaps/google-maps-services-js';

import {
  Container,
  ContentForm,
  Input,
  Search,
  ContentGeolocation,
  ContentReset,
} from './styles';

import { useDelivery } from '../../hooks/delivery';

interface IDelivery {
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

interface IGeolocation {
  latitude: number;
  longitude: number;
}

const Form: React.FC = () => {
  const client = new Client();
  const { REACT_APP_API_KEY } = process.env;

  const [nameCustomer, setNameCustomer] = useState('');
  const [weightCustomer, setWeightCustomer] = useState('');
  const [search, setSearch] = useState('');
  const [geolocation, setGeoloaction] = useState<IGeolocation>({
    latitude: 0,
    longitude: 0,
  });

  const [delivery, setDelivery] = useState<IDelivery>({} as IDelivery);

  const { createDelivery, resetDelivery } = useDelivery();

  async function handleSearch(): Promise<void> {
    if (!nameCustomer || !weightCustomer || !search) {
      alert(
        'Atenção ...\nPreencha corretamente todos os campos para realizar a busca!',
      );
      return;
    }

    client
      .geocode({
        params: {
          address: search,
          key: String(REACT_APP_API_KEY),
        },
        timeout: 1000,
      })
      .then(r => {
        const address = r.data.results[0].address_components;
        const geolocations = r.data.results[0].geometry.location;

        if (address.length >= 6) {
          setDelivery({
            name: nameCustomer,
            weight: weightCustomer,
            address: {
              number: address[0].long_name,
              street: address[1].long_name,
              neighborhood: address[2].long_name,
              city: address[3].long_name,
              state: address[4].long_name,
              country: address[5].long_name,
              geolocation: {
                latitude: geolocations.lat,
                longitude: geolocations.lng,
              },
            },
          });
          setGeoloaction({
            latitude: geolocations.lat,
            longitude: geolocations.lng,
          });
        } else {
          alert(
            'Atenção ... \nEndereço incompleto!\n\nExemplo: rua, N°, bairro - cidade',
          );
        }
      })
      .catch(e => {
        alert(
          'Atenção ... \nEndereço não encontrado, tente novamente!\n\nExemplo: rua, N°, bairro - cidade',
        );
      });
  }

  function clear(): void {
    setNameCustomer('');
    setWeightCustomer('');
    setSearch('');
    setGeoloaction({
      latitude: 0,
      longitude: 0,
    });
  }

  async function handleForm(): Promise<void> {
    try {
      if (!nameCustomer || !weightCustomer || !search) {
        alert(
          'Atenção ...\nPreencha todos os campos corretamente para realizar o cadastro!',
        );
        return;
      }

      if (Number(weightCustomer) <= 0) {
        alert('Atenção ...\nDigite uma valor válido para o peso da entrega!');
        setWeightCustomer('');
        return;
      }

      if (!geolocation?.latitude || !geolocation?.longitude) {
        alert(
          'Atenção ...\nRealize a busca do endereço antes de cadastrar o cliente!',
        );
        return;
      }

      createDelivery(delivery);

      clear();
    } catch (error) {
      alert('Ooops ... Aconteceu algum imprevisto, tente novamente!');
    }
  }

  const handleReset = useCallback(() => {
    if (window.confirm('Atenção ... Deseja resetar todos os cadastros?')) {
      resetDelivery();
    }
  }, [resetDelivery]);

  return (
    <Container>
      <ContentForm>
        <Input
          value={nameCustomer}
          onChange={e => setNameCustomer(e.target.value)}
          placeholder="Nome Cliente"
        />
        <Input
          value={weightCustomer}
          onChange={e => setWeightCustomer(e.target.value)}
          placeholder="Peso da Entrega"
          type="number"
          min="1"
          max="9999"
        />

        <Search>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Endereço do Cliente"
          />
          <button type="button" onClick={() => handleSearch()}>
            <FiSearch size={20} />
          </button>
        </Search>

        <ContentGeolocation>
          <input
            type="text"
            disabled
            placeholder="Latitude"
            value={
              geolocation.latitude !== 0 ? geolocation?.latitude.toFixed(5) : ''
            }
          />
          <input
            type="text"
            disabled
            placeholder="Longitude"
            value={
              geolocation.longitude !== 0
                ? geolocation?.longitude.toFixed(5)
                : ''
            }
          />
        </ContentGeolocation>

        <button type="button" onClick={() => handleForm()}>
          CADASTRAR CLIENTE
        </button>
      </ContentForm>

      <ContentReset>
        <button type="button" onClick={() => handleReset()}>
          RESETAR CADASTROS
        </button>
      </ContentReset>
    </Container>
  );
};

export default Form;
