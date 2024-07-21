export type StatusSensor = 'activo' | 'desactivado';
export interface Sensor {
    external_id: string;
    name: string;
    ip: string;
    status: string;
    latitude: double;
    longitude: double;
    type_sensor: string;
}