import 'leaflet/dist/leaflet.css';

import React, { useEffect, useRef } from 'react';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { renderToString } from 'react-dom/server';

const L = typeof window !== 'undefined' ? require('leaflet') : undefined;
const MapUbication = ({ setCoordinates }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.locate({ setView: true, maxZoom: 16 });

        const customIconHtml = renderToString(<LocationOnIcon style={{ color: 'red', fontSize: '30px' }} />);
        const customIcon = L.divIcon({
            html: customIconHtml,
            iconSize: [30, 30],
            className: 'custom-marker-icon'
        });

        map.on('click', (e) => {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            setCoordinates({ lat, lng });

            if (markerRef.current) {
                markerRef.current.setLatLng(e.latlng);
            } else {
                markerRef.current = L.marker(e.latlng, { icon: customIcon }).addTo(map);
            }
        });

        return () => {
            map.off('click');
            map.remove();
        };
    }, [setCoordinates]);

    return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};

export default MapUbication;