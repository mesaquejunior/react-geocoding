import React, { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
// import Graphic from '@arcgis/core/Graphic';
// import Point from '@arcgis/core/geometry/Point';
// import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import { MapContainer } from './styles';

interface PointInterface {
  latitude: number;
  longitude: number;
  maplevel: number;
}

const EsriMap: React.FC<PointInterface> = ({
  latitude,
  longitude,
  maplevel,
}: PointInterface) => {
  const mapDiv = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'gray-vector',
      });

      // if (maplevel !== 3) {
      //   const point = new Point({
      //     longitude,
      //     latitude,
      //   });

      //   const simpleMarkerSymbol = {
      //     type: 'simple-marker',
      //     color: [58, 58, 58],
      //     outline: {
      //       color: [240, 242, 245],
      //       width: 1,
      //     },
      //   };

      //   const graphicsLayer = new GraphicsLayer();
      //   map.add(graphicsLayer);

      //   const pointGraphic = new Graphic({
      //     geometry: point,
      //     symbol: simpleMarkerSymbol,
      //   });

      //   graphicsLayer.add(pointGraphic);
      // }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mapView = new MapView({
        map,
        container: mapDiv.current,
        center: [longitude, latitude],
        zoom: maplevel,
      });
    }
  }, [latitude, longitude, maplevel]);

  return (
    <MapContainer>
      <div id="mapDiv" ref={mapDiv} />
    </MapContainer>
  );
};

export default EsriMap;
