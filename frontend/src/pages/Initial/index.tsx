import React, { useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import L from 'leaflet';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Container, Form, Input, Search, Content } from './styles';

import 'leaflet/dist/leaflet.css';

type Location = Array<{
  name: string;
  position: [number, number];
  weight: string;
}>;

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';

const Initial: React.FC = () => {
  const position: [number, number] = [-20.4027236, -49.9786467];

  const [locations, setlocations] = useState<Location>([
    {
      name: 'Eduardo',
      position: [-20.4027236, -49.9786467],
      weight: '120Kg',
    },
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
  ]);

  return (
    <Container>
      <Form>
        <Input placeholder="Nome Cliente" />
        <Input placeholder="Peso da Entrega" />
        <Search>
          <input placeholder="Endereço do Cliente" />
          <button type="submit">
            <FiSearch size={17} />
          </button>
        </Search>
      </Form>

      <Content>
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
      </Content>
    </Container>
  );
};

export default Initial;
