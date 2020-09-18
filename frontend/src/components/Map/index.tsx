import React from 'react';

import { Map as Mapa, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { Container } from './styles';
import { useDelivery } from '../../hooks/delivery';
import { usePosition } from '../../hooks/position';

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/';

const Map: React.FC = () => {
  const { deliveries } = useDelivery();
  const { position } = usePosition();

  return (
    <Container>
      <Mapa
        className="MAP"
        center={[position.latitude, position.longitude]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {deliveries.map(delivery => (
          <Marker
            key={delivery._id}
            position={[
              delivery.address.geolocation.latitude,
              delivery.address.geolocation.longitude,
            ]}
          >
            <Popup>
              <b>{delivery.name}</b>
              <br />
              {delivery.weight}kg
            </Popup>
          </Marker>
        ))}
      </Mapa>
    </Container>
  );
};

export default Map;
