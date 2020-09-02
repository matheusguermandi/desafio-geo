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

type Location = Array<{
  name: string;
  position: [number, number];
  weight: string;
}>;

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';

const Initial: React.FC = () => {
  const [customer, setCustomer] = useState('');
  const [weight, setweight] = useState('');
  const [search, setSearch] = useState('');

  const position: [number, number] = [-20.4027236, -49.9786467];

  const [locations, setlocations] = useState<Location>([
    {
      name: 'Matheus',
      position: [-20.4027236, -49.96],
      weight: '80Kg',
    },
    {
      name: 'Thaís',
      position: [-20.4027236, -49.95],
      weight: '70Kg',
    },
    {
      name: 'Davi',
      position: [-20.4027236, -49.9786467],
      weight: '120Kg',
    },
  ]);

  const API_KEY = 'AIzaSyAJwTL_WQK7sIhlccPw7XhSLL_uoqlu_ic';
  const client = new Client();

  async function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!customer || !weight || !search) {
      alert('Ooops ... Preencha os campos corretamente!');
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
        const { lat, lng } = r.data.results[0].geometry.location;
        setlocations([
          ...locations,
          {
            name: customer,
            position: [lat, lng],
            weight,
          },
        ]);
      })
      .catch(e => {
        setSearch('');
        alert('Atenção ... Endereço não encontrado, tente novamente');
      });
  }

  return (
    <Container>
      <ContentSide>
        <ContentForm>
          <Input
            value={customer}
            onChange={e => setCustomer(e.target.value)}
            placeholder="Nome Cliente"
          />
          <Input
            value={weight}
            onChange={e => setweight(e.target.value)}
            placeholder="Peso da Entrega"
          />

          <form onSubmit={handleSearch}>
            <Search>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Endereço do Cliente"
              />
              <button type="submit">
                <FiSearch size={17} />
              </button>
            </Search>
          </form>

          <ContentGeolocation>
            <input type="text" disabled placeholder="Latitude" />
            <input type="text" disabled placeholder="Longitude" />
          </ContentGeolocation>

          <button>CADASTRAR CLIENTE</button>
        </ContentForm>

        <ContentReset>
          <button>RESETAR CADASTROS</button>
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
            {locations.map(location => (
              <Marker key={location.name} position={location.position}>
                <Popup>
                  <b>{location.name}</b>
                  <br />
                  {location.weight}
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
              {locations.map(location => (
                <tr>
                  <th>{location.name}</th>
                  <th>rua</th>
                  <th>Cidade</th>
                  <th>País</th>
                  <th>{location.weight}</th>
                  <th>{location.position[0]}</th>
                  <th>{location.position[1]}</th>
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
