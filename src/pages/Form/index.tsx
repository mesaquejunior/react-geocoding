import React, { ChangeEvent, useState } from 'react';
import FormData from 'form-data';
import { viacepapi, arcgisapi, geocodeapi } from '../../services/api';
import EsriMap from '../../components/EsriMap';
import { FormContainer, MyLocationWhite } from './styles';

interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalcode: string;
}

interface PointInterface {
  latitude: number;
  longitude: number;
  maplevel: number;
}

interface TokenInterface {
  token: string;
  expires_in: number;
}

const Form: React.FC = () => {
  const CLIENT_ID = 'INSERT A VALID CLIENT ID';
  const CLIENT_SECRET = 'INSERT CORRESPONDING CLIENT S SECRET';
  const FORM_DATA = new FormData();
  FORM_DATA.append('client_id', CLIENT_ID);
  FORM_DATA.append('client_secret', CLIENT_SECRET);
  FORM_DATA.append('f', 'pjson');
  FORM_DATA.append('grant_type', 'client_credentials');

  const [address, setAddress] = useState<Address>({
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    postalcode: '',
  });

  const [postalcode, setPostalCode] = useState<string>('');

  const [addressNumber, setAddressNumber] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myLocation, setMyLocation] = useState<PointInterface>({
    latitude: -15.1765,
    longitude: -48.335,
    maplevel: 3,
  });

  const [auth, setAuth] = useState<TokenInterface>({
    token: '',
    expires_in: 331549200000,
  });

  const handleGetAddress = async () => {
    try {
      const response = await viacepapi.get(`/${postalcode}/json`);
      setAddress({
        street: await response.data.logradouro,
        neighborhood: await response.data.bairro,
        city: await response.data.localidade,
        state: await response.data.uf,
        postalcode: await response.data.cep,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleGetLocation = () => {
    // eslint-disable-next-line no-console
    console.log('Minha Localização');
  };

  const handlePostalCodeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setPostalCode(event.target.value);
  };

  const handleAddressNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setAddressNumber(event.target.value);
  };

  const generateToken = async () => {
    try {
      const response = await arcgisapi.post('/oauth2/token', FORM_DATA);
      // eslint-disable-next-line no-console
      const expiration = Date.now() + response.data.expires_in * 1000;
      setAuth({
        token: response.data.access_token,
        expires_in: expiration,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleLocateAddress = async () => {
    const now = Date.now();
    const addressfrom = `${address.street}, ${addressNumber}, ${address.city}, ${address.state}, ${address.postalcode}`;
    if (now >= auth.expires_in) {
      generateToken();
    }
    const response = await geocodeapi.get('/findAddressCandidates', {
      params: {
        address: addressfrom,
        outFields: '*',
        token: auth.token,
        f: 'pjson',
        maxLocations: '1',
      },
    });

    setMyLocation({
      longitude: await response.data.candidates[0].location.x,
      latitude: await response.data.candidates[0].location.y,
      maplevel: 18,
    });
  };

  const handleClearForm = () => {
    setPostalCode('');
    setAddressNumber('');
    setAddress({
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      postalcode: '',
    });
    setMyLocation({
      latitude: -15.1765,
      longitude: -48.335,
      maplevel: 3,
    });
  };

  return (
    <>
      <FormContainer>
        <h1>React - ArcGIS Geocoding</h1>
        <div className="postalcode">
          <label htmlFor="postalcode">
            <input
              type="text"
              id="postalcode"
              placeholder="CEP"
              pattern="[0-9]{8}"
              onChange={handlePostalCodeChange}
              value={postalcode}
            />
          </label>
          <input
            type="button"
            value="Pesquisar"
            className="button"
            onClick={handleGetAddress}
          />
          <button
            type="button"
            className="button mylocation"
            onClick={handleGetLocation}
          >
            <MyLocationWhite />
          </button>
        </div>
        <div className="address">
          <div className="eightytwenty">
            <label htmlFor="streetname">
              <input
                type="text"
                className="eighty"
                id="streetname"
                placeholder="Rua"
                value={address.street}
                readOnly
              />
            </label>
            <label htmlFor="addressnumber">
              <input
                type="text"
                className="twenty"
                id="addressnumber"
                placeholder="Nº"
                onChange={handleAddressNumberChange}
                value={addressNumber}
              />
            </label>
          </div>
          <label htmlFor="neighborhood">
            <input
              type="text"
              id="neighborhood"
              placeholder="Bairro"
              value={address.neighborhood}
              readOnly
            />
          </label>
          <div className="eightytwenty">
            <label htmlFor="city">
              <input
                type="text"
                id="city"
                placeholder="Cidade"
                value={address.city}
                className="eighty"
                readOnly
              />
            </label>
            <label htmlFor="state">
              <input
                type="text"
                id="state"
                placeholder="UF"
                value={address.state}
                className="twenty"
                readOnly
              />
            </label>
          </div>
        </div>
        <div className="buttons">
          <input
            type="button"
            value="Localizar"
            className="button"
            onClick={handleLocateAddress}
          />
          <input
            type="button"
            value="Limpar"
            className="button"
            onClick={handleClearForm}
          />
        </div>
      </FormContainer>
      <EsriMap
        latitude={myLocation.latitude}
        longitude={myLocation.longitude}
        maplevel={myLocation.maplevel}
      />
    </>
  );
};

export default Form;
