import 'leaflet/dist/leaflet.css';

import React, { useEffect, useRef } from 'react';

// Importar dinámicamente el módulo leaflet para evitar problemas con SSR
const L = typeof window !== 'undefined' ? require('leaflet') : undefined;

const MapUbication = ({ setCoordinates }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || !L) return;

        const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.locate({ setView: true, maxZoom: 16 });

        map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            setCoordinates({ lat, lng });
        });

        return () => {
            map.off('click');
            map.remove();
        };
    }, [setCoordinates]);

    return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};

export default MapUbication;
