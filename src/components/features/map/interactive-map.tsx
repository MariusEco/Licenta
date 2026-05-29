"use client";

import type { Map as LeafletMap } from "leaflet";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { formatCurrency, formatDifficulty } from "@/lib/formatters";
import type { CountrySummaryView } from "@/types/explorer";

type MapLocation = CountrySummaryView;

type InteractiveMapProps = {
  locations: MapLocation[];
};

function getLocationHref(location: MapLocation) {
  return `/countries/${location.slug}`;
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

      const pinIcon = L.divIcon({
        className: "country-map-pin",
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px;transform:translateY(-12px);">
            <div style="width:18px;height:18px;border-radius:9999px 9999px 9999px 0;background:#0f766e;transform:rotate(-45deg);box-shadow:0 2px 10px rgba(15,118,110,0.35);border:2px solid white;"></div>
            <div style="width:6px;height:6px;border-radius:9999px;background:white;position:absolute;top:6px;"></div>
          </div>
        `,
        iconSize: [18, 26],
        iconAnchor: [9, 24],
        popupAnchor: [0, -22],
      });

      locations.forEach((location) => {
        if (
          location.latitude == null ||
          location.longitude == null ||
          !Number.isFinite(location.latitude) ||
          !Number.isFinite(location.longitude)
        ) {
          return;
        }

        const marker = L.marker([location.latitude, location.longitude], {
          icon: pinIcon,
          keyboard: false,
        }).addTo(map);

        const navigateToCountry = () => {
          router.push(getLocationHref(location) as Route);
        };

        const popup = document.createElement("div");
        const title = document.createElement("strong");
        const titleLink = document.createElement("a");
        const cost = document.createElement("p");
        const salary = document.createElement("p");
        const difficulty = document.createElement("p");

        title.textContent = "Țară: ";
        titleLink.textContent = location.name;
        titleLink.href = getLocationHref(location);
        titleLink.style.color = "#0f766e";
        titleLink.style.textDecoration = "underline";
        titleLink.addEventListener("click", (event) => {
          event.preventDefault();
          router.push(getLocationHref(location) as Route);
        });
        cost.textContent = `Cost lunar: ${formatCurrency(location.monthlyCostEur)}`;
        salary.textContent = `Salariu mediu: ${formatCurrency(location.averageSalaryEur)}`;
        difficulty.textContent = `Dificultate: ${formatDifficulty(location.emigrationDifficulty)}`;
        title.append(titleLink);
        popup.append(title, cost, salary, difficulty);

        marker.bindPopup(popup);

        marker.on("click", () => {
          marker.openPopup();
        });

        marker.on("dblclick", () => {
          navigateToCountry();
        });

        marker.on("add", () => {
          const element = marker.getElement();

          if (element) {
            element.addEventListener("dblclick", navigateToCountry);
          }
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
