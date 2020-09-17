import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-top: 10px;

  table {
    margin-bottom: 10px;
    border: 2px solid #bcbcbc;
    border-radius: 5px;
    flex: 1;

    thead {
      background-color: #a5a5a5;
      color: #fff;

      th {
        padding: 5px;
      }
    }

    tbody {
      background-color: #e1e1e1;
      color: #000;

      th {
        padding: 5px;
      }

      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    }
  }
`;
