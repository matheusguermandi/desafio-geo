import React, { useState, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

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
  name: string;
  weight: string;
  street: string;
  num: number;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

type IDeliveries = Array<{
  id?: string;
  name: string;
  street: string;
  city: string;
  country: string;
  weight: string;
  latitude: number;
  longitude: number;
}>;

interface IGeolocation {
  latitude: number;
  longitude: number;
}

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';

const Initial: React.FC = () => {
  const client = new Client();
  const API_KEY = 'AIzaSyAJwTL_WQK7sIhlccPw7XhSLL_uoqlu_ic';

  const [nameCustomer, setNameCustomer] = useState('');
  const [weightCustomer, setWeightCustomer] = useState('');
  const [search, setSearch] = useState(
    'rua amazonas, 3814, centro, votuporanga',
  );
  const [geolocation, setGeoloaction] = useState<IGeolocation>();

  const position: [number, number] = [-20.4027236, -49.9786467];

  const [delivery, setDelivery] = useState<IDelivery>({
    name: '',
    weight: '',
    num: 0,
    street: '',
    neighborhood: '',
    complement: '',
    state: '',
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
  });

  const [deliveries, setDeliveries] = useState<IDeliveries>([
    {
      name: 'Matheus',
      weight: '80Kg',
      street: 'Nassif miguel',
      city: 'Votuporanga',
      country: 'Brasil',
      latitude: -20.4028,
      longitude: -49.97882,
    },
  ]);

  async function handleSearch(): Promise<void> {
    if (!nameCustomer || !weightCustomer || !search || nameCustomer === '') {
      alert('Ooops ... Preencha os campos corretamente!');
      return;
    }

    if (Number(weightCustomer) <= 0) {
      alert('Ooops ...Digite uma valor válido para o peso da entrega');
      setWeightCustomer('');
      return;
    }

    client
      .geocode({
        params: {
          address: search,
          key: API_KEY,
        },
        timeout: 1000,
      })
      .then(r => {
        console.log(r.data.results[0]);

        const { lat, lng } = r.data.results[0].geometry.location;

        setGeoloaction({ latitude: lat, longitude: lng });

        setDelivery({
          name: nameCustomer,
          weight: weightCustomer,
          street: r.data.results[0].address_components[1].long_name,
          num: Number(r.data.results[0].address_components[0].long_name),
          neighborhood: r.data.results[0].address_components[2].long_name,
          complement: 'Complemento',
          city: r.data.results[0].address_components[3].long_name,
          state: r.data.results[0].address_components[4].long_name,
          country: r.data.results[0].address_components[5].long_name,
          latitude: lat,
          longitude: lng,
        });
      })
      .catch(e => {
        setSearch('');
        alert('Atenção ... Endereço não encontrado, tente novamente');
      });
  }

  async function handleForm(): Promise<void> {
    if (
      !nameCustomer ||
      !weightCustomer ||
      !search ||
      !geolocation?.latitude ||
      !geolocation?.longitude
    ) {
      alert('Ooops ... Preencha os campos corretamente!');
      return;
    }

    setDeliveries([
      ...deliveries,
      {
        name: delivery.name,
        weight: delivery.weight,
        city: delivery.city,
        country: delivery.country,
        street: delivery.street,
        latitude: delivery.latitude,
        longitude: delivery.longitude,
      },
    ]);

    setNameCustomer('');
    setWeightCustomer('');
    setSearch('');
    setGeoloaction({
      latitude: 0,
      longitude: 0,
    });
  }

  async function handleReset(): Promise<void> {
    if (window.confirm('Atenção ... Deseja resetar todos os cadastros?')) {
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
              <FiSearch size={17} />
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
            className="MAPA"
            center={position}
            zoom={14}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {deliveries.map(delivery => (
              <Marker
                key={delivery.name}
                position={[delivery.latitude, delivery.longitude]}
              >
                <Popup>
                  <b>{delivery.name}</b>
                  <br />
                  {delivery.weight}
                </Popup>
              </Marker>
            ))}
          </Map>
        </ContentMap>

        <ContentTable>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Rua</th>
                <th>Cidade</th>
                <th>País</th>
                <th>Peso</th>
                <th>LAT</th>
                <th>LNG</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(delivery => (
                <tr key={delivery.name}>
                  <th>{delivery.name}</th>
                  <th>{delivery.street}</th>
                  <th>{delivery.city}</th>
                  <th>{delivery.country}</th>
                  <th>{delivery.weight}</th>
                  <th>{delivery.latitude.toFixed(5)}</th>
                  <th>{delivery.longitude.toFixed(5)}</th>
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
