import axios from 'axios';

const arcgisapi = axios.create({
  baseURL: 'https://www.arcgis.com/sharing/rest',
});

const geocodeapi = axios.create({
  baseURL:
    'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer',
});

const viacepapi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export { arcgisapi, geocodeapi, viacepapi };
