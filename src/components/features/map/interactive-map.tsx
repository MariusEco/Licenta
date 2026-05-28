"use client";

import type { Map as LeafletMap } from "leaflet";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { formatCurrency, formatDifficulty } from "@/lib/formatters";
import type { CitySummaryView, CountrySummaryView } from "@/types/explorer";

type MapLocation = CountrySummaryView | CitySummaryView;

type InteractiveMapProps = {
  locations: MapLocation[];
};

function getLocationHref(location: MapLocation) {
  return (location.kind === "COUNTRY"
    ? `/countries/${location.slug}`
    : `/cities/${location.slug}`) as Route;
}

export function InteractiveMap({ locations }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) {
      return;
    }

    let isCancelled = false;

    async function createMap() {
      if (!mapRef.current) {
        return;
      }

      const L = await import("leaflet");

      if (isCancelled || leafletMapRef.current || !mapRef.current) {
        return;
      }

      const map = L.map(mapRef.current, {
        center: [48.5, 10.5],
        zoom: 4,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      locations.forEach((location) => {
        if (location.latitude === null || location.longitude === null) {
          return;
        }

        const marker = L.circleMarker([location.latitude, location.longitude], {
          radius: location.kind === "COUNTRY" ? 8 : 6,
          color: location.kind === "COUNTRY" ? "#0f766e" : "#d97706",
          fillColor: location.kind === "COUNTRY" ? "#0f766e" : "#d97706",
          fillOpacity: 0.85,
          weight: 2,
        }).addTo(map);

        const popup = document.createElement("div");
        const title = document.createElement("strong");
        const cost = document.createElement("p");
        const salary = document.createElement("p");
        const difficulty = document.createElement("p");

        title.textContent = location.name;
        cost.textContent = `Cost lunar: ${formatCurrency(location.monthlyCostEur)}`;
        salary.textContent = `Salariu mediu: ${formatCurrency(location.averageSalaryEur)}`;
        difficulty.textContent = `Dificultate: ${formatDifficulty(location.emigrationDifficulty)}`;
        popup.append(title, cost, salary, difficulty);

        marker.bindPopup(popup);

        marker.on("click", () => {
          marker.openPopup();
        });

        marker.on("dblclick", () => {
          router.push(getLocationHref(location));
        });
      });

      leafletMapRef.current = map;
    }

    void createMap();

    return () => {
      isCancelled = true;
      leafletMapRef.current?.remove();
      leafletMapRef.current = null;
    };
  }, [locations, router]);

  return (
    <div
      ref={mapRef}
      className="min-h-[560px] w-full border border-border bg-white"
      aria-label="Hartă interactivă cu locații pentru emigrare"
    />
  );
}
