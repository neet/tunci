"use client";

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
        className={clsx(
          "fill-white dark:fill-black",
          "stroke-2",
          "stroke-gray-400 dark:stroke-zinc-600",
        )}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>

      {dialects.map((dialect) => (
        <Marker
          key={dialect.value}
          coordinates={dialect.coordinates}
          className="cursor-pointer"
          onClick={() => {
            onChange?.(dialect.value);
          }}
        >
          {dialect.value === value ? (
            <circle
              r={15}
              className={clsx(
                "fill-indigo-600 dark:fill-indigo-400",
                "stroke-2",
                "stroke-indigo-100 dark:stroke-indigo-900",
              )}
            />
          ) : (
            <circle
              r={10}
              className={clsx(
                "fill-gray-400 dark:fill-zinc-600",
                "stroke-2",
                "stroke-gray-100 dark:stroke-zinc-900",
              )}
            />
          )}

          {dialect.value === value ? (
            <text
              textAnchor="middle"
              y={markerOffset - 6}
              className="font-bold text-[2em] font-sans fill-indigo-600 dark:fill-indigo-400"
            >
              {dialect.name}
            </text>
          ) : (
            <text
              textAnchor="middle"
              y={markerOffset}
              className="text-base text-[1.4em] font-sans fill-gray-600 dark:fill-zinc-400"
            >
              {dialect.name}
            </text>
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
};
