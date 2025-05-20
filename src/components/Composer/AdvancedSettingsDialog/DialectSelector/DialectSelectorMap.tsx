import "./DialectSelectorMap.css";

import clsx from "clsx";
import { FC } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { Dialect } from "./model";

const markerOffset = -15;

export type DialectSelectorMapProps = {
  value?: string;
  dialects: Dialect[];
  onChange?(value: string): void;
};

export const DialectSelectorMap: FC<DialectSelectorMapProps> = (props) => {
  const { value, dialects, onChange } = props;

  return (
    <ComposableMap
      id="DialectSelectorMap"
      width={800}
      height={620}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-142.5, -43.5, 0],
        scale: 9000,
      }}
    >
      <title>
        北海道の方言の地図。マウスを使うと、各地をクリックすることで方言を選べます。
      </title>

      <Geographies geography="/hokkaido.json" className="geographies">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>

      <g aria-hidden>
        {dialects.map((dialect) => (
          <Marker
            key={dialect.value}
            coordinates={dialect.coordinates}
            onClick={() => {
              onChange?.(dialect.value);
            }}
          >
            <circle
              r={dialect.value === value ? 15 : 10}
              className={clsx("circle", {
                "circle--selected": dialect.value === value,
              })}
            />

            <text
              textAnchor="middle"
              y={markerOffset - 6}
              className={clsx("caption", {
                "caption--selected": dialect.value === value,
              })}
            >
              {dialect.name}
            </text>
          </Marker>
        ))}
      </g>
    </ComposableMap>
  );
};
