import vehicles from './data/vehicles.js';

const tollFreeVehicles = vehicles
    .filter(vehicle => vehicle.tollFree)
    .map(vehicle => vehicle.name);

function getVehicle(vehicle) {
    return tollFreeVehicles.includes(vehicle);
}

export default getVehicle;
