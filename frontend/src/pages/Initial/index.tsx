import React, { useState, useMemo, useEffect } from 'react';
import { FiSearch, FiTrash } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { Client } from '@googlemaps/google-maps-services-js';

import api from '../../service/api';

import 'leaflet/dist/leaflet.css';
import {
  Container,
  ContentSide,
  ContentForm,
  Input,
  Search,
  ContentGeolocation,
  ContentReset,
  ContentCentral,
  ContentMap,
  ContentTable,
} from './styles';

interface IDelivery {
  _id: string;
  name: string;
  weight: string;
  address: {
    street: string;
    number: number;
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

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';

const Initial: React.FC = () => {
  const client = new Client();
  const { REACT_APP_API_KEY } = process.env;

  const [nameCustomer, setNameCustomer] = useState('');
  const [weightCustomer, setWeightCustomer] = useState('');
  const [search, setSearch] = useState('');
  const [geolocation, setGeoloaction] = useState<IGeolocation>();

  // Localização - Roteirizador RoutEasy
  const [position, setPosition] = useState<IGeolocation>({
    latitude: -23.596584,
    longitude: -46.648904,
  });

  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const [delivery, setDelivery] = useState<Omit<IDelivery, '_id'>>({
    name: '',
    weight: '',
    address: {
      number: 0,
      street: '',
      neighborhood: '',
      complement: '',
      state: '',
      city: '',
      country: '',
      geolocation: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

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

  useEffect(() => {
    api.get(`/`).then(response => {
      setDeliveries(response.data);
    });
  }, []);

  function clear(): void {
    setNameCustomer('');
    setWeightCustomer('');
    setSearch('');
    setGeoloaction({
      latitude: 0,
      longitude: 0,
    });
  }

  async function handleSearch(): Promise<void> {
    if (!nameCustomer || !weightCustomer || !search) {
      alert(
        'Atenção ...\nPreencha todos os campos(Nome, Peso e Endereço) corretamente para realizar a busca!',
      );
      setGeoloaction({
        latitude: 0,
        longitude: 0,
      });
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
              number: Number(address[0].long_name),
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
          setSearch('');
          alert('Oops ... Endereço incompleto!');
        }
      })
      .catch(e => {
        setSearch('');
        console.log(e);
        alert('Atenção ... Endereço não encontrado, tente novamente!');
      });
  }

  async function handleForm(): Promise<void> {
    if (!nameCustomer || !weightCustomer || !search) {
      alert(
        'Atenção ...\nPreencha todos os campos(Nome, Peso e Endereço) corretamente para realizar o cadastro!',
      );
      setGeoloaction({
        latitude: 0,
        longitude: 0,
      });
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

    await api.post<IDelivery>('/ ', delivery).then(response => {
      const newDelivery = response.data;
      setDeliveries([...deliveries, { ...newDelivery }]);
    });

    clear();
    setPosition({
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
    });
  }

  async function handleDelete(id: string): Promise<void> {
    if (window.confirm('Atenção ... Deseja excluir esse cadastro?')) {
      setDeliveries(
        deliveries.filter(d => {
          if (d._id !== id) {
            return d;
          }
        }),
      );
      await api.delete(`/${id}`);
    }
  }

  async function handleReset(): Promise<void> {
    if (window.confirm('Atenção ... Deseja resetar todos os cadastros?')) {
      await api.delete('/');
      setDeliveries([]);
    }
  }

  return (
    <Container>
      <ContentSide>
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
              value={geolocation?.latitude.toFixed(5)}
            />
            <input
              type="text"
              disabled
              placeholder="Longitude"
              value={geolocation?.longitude.toFixed(5)}
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
      </ContentSide>

      <ContentCentral>
        <ContentMap>
          <Map
            className="MAP"
            center={[position.latitude, position.longitude]}
            zoom={14}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {deliveries.map(auxDelivery => (
              <Marker
                key={auxDelivery._id}
                position={[
                  auxDelivery.address.geolocation.latitude,
                  auxDelivery.address.geolocation.longitude,
                ]}
              >
                <Popup>
                  <b>{auxDelivery.name}</b>
                  <br />
                  {auxDelivery.weight}kg
                </Popup>
              </Marker>
            ))}
          </Map>
        </ContentMap>

        <ContentTable>
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
                <th style={{ color: 'red' }}> X </th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(auxDelivery => (
                <tr key={auxDelivery._id}>
                  <th>{auxDelivery.name}</th>
                  <th>{auxDelivery.address.street}</th>
                  <th>{auxDelivery.address.city}</th>
                  <th>{auxDelivery.address.country}</th>
                  <th>{auxDelivery.weight}</th>
                  <th>{auxDelivery.address.geolocation.latitude.toFixed(3)}</th>
                  <th>
                    {auxDelivery.address.geolocation.longitude.toFixed(3)}
                  </th>
                  <th>
                    <button
                      type="button"
                      onClick={() => handleDelete(auxDelivery._id)}
                    >
                      <FiTrash size={17} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentTable>
      </ContentCentral>
    </Container>
  );
};

export default Initial;
