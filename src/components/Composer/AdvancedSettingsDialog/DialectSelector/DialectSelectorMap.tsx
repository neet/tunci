"use client";

import { FC } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { usePrefersColorScheme } from "./usePrefersColorScheme";

const markers = [
  {
    markerOffset: -15,
    name: "沙流",
    coordinates: [142.0865, 42.6054],
  },
  {
    markerOffset: -15,
    name: "千歳",
    coordinates: [141.6738, 42.8194],
  },
  {
    markerOffset: -15,
    name: "幌別",
    coordinates: [141.1068, 42.4129],
  },
  {
    markerOffset: -15,
    name: "静内",
    coordinates: [142.3647, 42.3321],
  },
  {
    markerOffset: -15,
    name: "様似",
    coordinates: [142.9261, 42.1286],
  },
  {
    markerOffset: -15,
    name: "十勝",
    coordinates: [143.1965, 42.9238],
  },
  {
    markerOffset: -15,
    name: "釧路",
    coordinates: [144.3814, 42.9849],
  },
  {
    markerOffset: -15,
    name: "美幌",
    coordinates: [144.1079, 43.8395],
  },
  {
    markerOffset: -15,
    name: "石狩",
    coordinates: [142.3589, 43.7706],
  },
] satisfies Array<{
  markerOffset: number;
  name: string;
  coordinates: [number, number];
}>;

export type DialectSelectorMapProps = {
  value?: string;
  onChange?(value: string): void;
};

const ZINC_900 = "#18181b";
const ZINC_600 = "#52525b";
const ZINC_400 = "#a1a1aa";

const GRAY_100 = "#f3f4f6";
const GRAY_400 = "#9ca3af";
const GRAY_600 = "#4b5563";

const INDIGO_100 = "#e0e7ff";
const INDIGO_400 = "#818cf8";
const INDIGO_600 = "#4f46e5";
const INDIGO_900 = "#312e81";

export const DialectSelectorMap: FC<DialectSelectorMapProps> = (props) => {
  const { value, onChange } = props;

  const { prefersColorScheme } = usePrefersColorScheme();
  const light = prefersColorScheme === "light";

  return (
    <ComposableMap
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

      <Geographies
        geography="/hokkaido.json"
        fill={light ? "white" : "black"}
        stroke={light ? GRAY_400 : ZINC_600}
        strokeWidth="2px"
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>

      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker
          key={name}
          coordinates={coordinates}
          className="cursor-pointer"
          onClick={() => {
            onChange?.(name);
          }}
        >
          {value === name ? (
            <circle
              r={15}
              fill={light ? INDIGO_600 : INDIGO_400}
              stroke={light ? INDIGO_100 : INDIGO_900}
              strokeWidth={2}
            />
          ) : (
            <circle
              r={10}
              fill={light ? GRAY_400 : ZINC_600}
              stroke={light ? GRAY_100 : ZINC_900}
              strokeWidth={2}
            />
          )}

          {value === name ? (
            <text
              textAnchor="middle"
              y={markerOffset - 6}
              style={{
                fontFamily: "system-ui",
                fill: light ? INDIGO_600 : INDIGO_400,
                fontSize: "2em",
                fontWeight: "bold",
              }}
            >
              {name}
            </text>
          ) : (
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontFamily: "system-ui",
                fill: light ? GRAY_600 : ZINC_400,
                fontSize: "1.4em",
              }}
            >
              {name}
            </text>
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
};
