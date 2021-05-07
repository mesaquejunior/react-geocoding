import styled from 'styled-components';
import { MyLocation } from '@styled-icons/material-sharp/MyLocation';

export const MyLocationWhite = styled(MyLocation)`
  color: #f0f2f5;
  width: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  width: 100vw;

  h1 {
    font-size: 1.3rem;
    text-transform: uppercase;
    margin: 5px 0;
  }

  .postalcode {
    width: 95%;
    display: flex;
    justify-content: center;
    input {
      width: 120px;
      margin-left: 5px;
    }

    .mylocation {
      margin-left: 5px;
      width: 40px;
    }
  }

  .address {
    width: 95%;
    max-width: 400px;
    margin-top: 5px;

    input {
      margin-top: 5px;
    }
  }

  label input {
    padding: 5px;
    border-radius: 0;
    border: 1px solid #3a3a3a;
    color: #3a3a3a;
    width: 100%;
  }

  .button {
    padding: 5px;
    font-weight: 500;
    color: #f0f2f5;
    background-color: #3a3a3a;
    text-transform: uppercase;
    border: none;
    border-radius: 0;
    cursor: pointer;
  }

  .eightytwenty {
    width: 100%;
  }

  .eighty {
    width: 78%;
  }

  .twenty {
    width: 20%;
    margin-left: 2%;
  }

  .buttons {
    margin-top: 10px;
    input[type='button'] {
      width: 120px;
      & + input {
        margin-left: 5px;
      }
    }
  }
`;
