import React, { useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import L from 'leaflet';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Container, Form, Input, Search, Content } from './styles';

import 'leaflet/dist/leaflet.css';

interface Location {
  name: string;
  position: [number, number];
  size: number;
  forecast: string;
}

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';

const Initial: React.FC = () => {
  const position: [number, number] = [-23.552694, -46.611978];

  const [locations, setlocations] = useState<Location>({
    name: 'west',
    position: [-23.552694, -46.6],
    size: 40,
    forecast: 'cloudy',
  });

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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={locations.position}>
            <Popup>{locations.forecast}</Popup>
          </Marker>
        </Map>
      </Content>
    </Container>
  );
};

export default Initial;
