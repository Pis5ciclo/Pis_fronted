// import 'leaflet/dist/leaflet.css';

import { Card, CardContent, CardHeader, Grid } from '@mui/material';
// import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
// import { useEffect, useState } from 'react';

// import L from 'leaflet';

// const DefaultIcon = L.icon({
//     iconUrl: '/image/marker.png',
//     shadowUrl: '/image/marker.png',
//     iconSize: [50, 60],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;
// const UpdateMapView = ({ center }: { center: [number, number] }) => {
//     const map = useMap();
//     useEffect(() => {
//         map.setView(center, 13);
//     }, [center, map]);
//     return null;
// };

const MapUbication = () => {
    // const [position, setPosition] = useState<[number, number] | null>(null);

    // useEffect(() => {
    //     const getUserLocation = () => {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //                 (pos) => {
    //                     const newPosition: [number, number] = [pos.coords.latitude, pos.coords.longitude];
    //                     console.log('User position:', newPosition);
    //                     setPosition(newPosition);
    //                 },
    //                 (error) => {
    //                     console.error('Error getting user location:', error);
    //                 }
    //             );
    //         } else {
    //             console.log('Geolocation is not supported by this browser.');
    //         }
    //     };

    //     getUserLocation();
    // }, []);
    // const defaultCenter: [number, number] = [51.505, -0.09];
    return (
        <Card>
            <h1>Aui va el mapa</h1>
            {/* <CardHeader
                title="Ubicación de Sensores"
                titleTypographyProps={{ align: 'center' }}
            />
            <CardContent>
                <Grid container justifyContent="center">
                    <MapContainer center={defaultCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {position && (
                            <>
                                <UpdateMapView center={position} />
                                <Marker position={position}>
                                    <Popup>
                                        Aqui estoy <br /> Latitud: {position[0]}, Longitud: {position[1]}
                                    </Popup>
                                </Marker>
                            </>
                        )}
                    </MapContainer>
                </Grid>
            </CardContent> */}
        </Card>
    );
};

export default MapUbication;
