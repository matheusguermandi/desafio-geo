import React from 'react';

import { FiSearch } from 'react-icons/fi';

import { Container, Form, Input, Search, Content } from './styles';

const Initial: React.FC = () => {
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
        <div id="mapid" />
      </Content>
    </Container>
  );
};

export default Initial;
