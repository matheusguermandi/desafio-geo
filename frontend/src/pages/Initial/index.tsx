import React from 'react';

import { Container, ContentCentral } from './styles';

import Form from '../../components/Form';
import Map from '../../components/Map';
import Table from '../../components/Table';

const Initial: React.FC = () => {
  return (
    <Container>
      <Form />

      <ContentCentral>
        <Map />
        <Table />
      </ContentCentral>
    </Container>
  );
};

export default Initial;
