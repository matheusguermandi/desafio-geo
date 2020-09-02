import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 10px;

  width: 25%;
  max-width: 300px;
  max-height: 350px;

  background: #f2f2f2;
  border: 2px solid #bcbcbc;
  border-radius: 5px;
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
    flex: 1;
    padding: 7px;
    margin: 10px 0px 10px 10px;
    border: 2px solid #bcbcbc;
    border-right: 0px;
    border-radius: 5px 0px 0px 5px;
  }
  button {
    display: flex;
    align-items: center;
    padding: 0px 15px;
    margin: 10px 10px 10px 0px;
    border-radius: 0px 5px 5px 0px;
    background: #04d361;
    border: 0;
    color: #fff;
    font-weight: bold;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 75%;
  max-width: 900px;
  max-height: 500px;

  border: 2px solid #bcbcbc;
  border-radius: 5px;
`;
