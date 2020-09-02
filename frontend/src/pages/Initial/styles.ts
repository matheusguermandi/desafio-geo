import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const ContentSide = styled.div`
  display: flex;
  flex-direction: column;

  width: 25%;
  max-width: 300px;
  max-height: 450px;
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;

  background: #f2f2f2;
  border: 2px solid #bcbcbc;
  border-radius: 5px;

  button {
    padding: 7px;
    margin: 20px 10px;
    border: 2px solid #bcbcbc;
    border-radius: 5px;
    background: #3cbc8d;
    color: #fff;
    font-weight: bold;
  }
`;

export const ContentReset = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 10px;

  background: #f2f2f2;
  border: 2px solid #bcbcbc;
  border-radius: 5px;

  button {
    padding: 7px;
    margin: 15px 10px;
    border: 2px solid #bcbcbc;
    border-radius: 5px;
    background: #ff0000;
    color: #fff;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  margin: 10px;
  padding: 7px;
  border: 2px solid #bcbcbc;
  border-radius: 5px;
`;

export const Search = styled.div`
  display: flex;

  input {
    width: 80%;
    padding: 7px;
    margin: 10px 0px 10px 10px;

    border: 2px solid #bcbcbc;
    border-right: 0px;
    border-radius: 5px 0px 0px 5px;
  }

  button {
    width: 20%;
    display: flex;
    align-items: center;
    padding: 0px 15px;
    margin: 10px 10px 10px 0px;
    border-radius: 0px 5px 5px 0px;
    background: #7d7d7d;
    border: 0;
    color: #fff;
    font-weight: bold;
  }
`;

export const ContentGeolocation = styled.div`
  display: flex;
  margin: 40px 5px;

  input {
    text-align: center;
    width: 50%;
    padding: 7px;
    background-color: #d9d9d9;
    border: 2px solid #bcbcbc;
    margin: 0px 5px;
    border-radius: 5px;
  }
`;

export const ContentCentral = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 75%;
  max-width: 900px;
`;

export const ContentMap = styled.div`
  flex: 1;
  border: 2px solid #bcbcbc;
  border-radius: 5px;

  max-width: 900px;

  height: 450px;
  max-height: 450px;
`;

export const ContentTable = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  margin-top: 10px;

  table {
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
