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
  name: string;
  weight: string;
  street: string;
  number: number;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface IDeliveries {
  _id: string;
  name: string;
  street: string;
  city: string;
  country: string;
  weight: string;
  latitude: number;
  longitude: number;
}

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
  const [search, setSearch] = useState('');
  const [geolocation, setGeoloaction] = useState<IGeolocation>();

  // Localização - Roteirizador RoutEasy
  const [position, setPosition] = useState<IGeolocation>({
    latitude: -23.596,
    longitude: -46.648,
  });

  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const [deliveries, setDeliveries] = useState<IDeliveries[]>([]);
  const [delivery, setDelivery] = useState<IDelivery>({
    name: '',
    weight: '',
    number: 0,
    street: '',
    neighborhood: '',
    complement: '',
    state: '',
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
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
          key: API_KEY,
        },
        timeout: 1000,
      })
      .then(r => {
        const { lat, lng } = r.data.results[0].geometry.location;
        setGeoloaction({ latitude: lat, longitude: lng });

        // variável auxiliar - Utilizada quando o retorno da api vem faltando o número do endereço
        const aux = r.data.results[0].address_components.length < 7 ? -1 : 0;

        setDelivery({
          name: nameCustomer,
          weight: weightCustomer,
          number:
            aux === 0
              ? Number(r.data.results[0].address_components[0].long_name)
              : 1,
          complement: 'Complemento',
          street: r.data.results[0].address_components[1 + aux].long_name,
          neighborhood: r.data.results[0].address_components[2 + aux].long_name,
          city: r.data.results[0].address_components[3 + aux].long_name,
          state: r.data.results[0].address_components[4 + aux].long_name,
          country: r.data.results[0].address_components[5 + aux].long_name,
          latitude: lat,
          longitude: lng,
        });
      })
      .catch(e => {
        setSearch('');
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

    await api.post<IDeliveries>('/ ', delivery).then(response => {
      const newDelivery = response.data;
      setDeliveries([...deliveries, { ...newDelivery }]);
    });

    setPosition({
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
    });

    setNameCustomer('');
    setWeightCustomer('');
    setSearch('');
    setGeoloaction({
      latitude: 0,
      longitude: 0,
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
              <FiSearch size={11} />
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
                key={auxDelivery.name}
                position={[auxDelivery.latitude, auxDelivery.longitude]}
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
                <tr key={auxDelivery.name}>
                  <th>{auxDelivery.name}</th>
                  <th>{auxDelivery.street}</th>
                  <th>{auxDelivery.city}</th>
                  <th>{auxDelivery.country}</th>
                  <th>{auxDelivery.weight}</th>
                  <th>{auxDelivery.latitude.toFixed(3)}</th>
                  <th>{auxDelivery.longitude.toFixed(3)}</th>
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
