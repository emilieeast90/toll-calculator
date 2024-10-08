import getCurrentFee from "./Fee.js";
import getVehicle from "./Vehicle.js";
import dates from './data/dates.js';

function TollCalculator() {
    let totalFeesByVehicle = {};

    for (let i = 0; i < dates.length; i++) {
        const currentVehicle = dates[i].vehicle;
        const currentDateTime = dates[i].date;

        console.log(`Processing vehicle: ${currentVehicle}, dateTime: ${currentDateTime}`);

        const isTollFreeVehicle = getVehicle(currentVehicle);

        if (isTollFreeVehicle) {
            console.log(`${currentVehicle} is toll-free.`);
            continue;
        }

        if (!totalFeesByVehicle[currentVehicle]) {
            totalFeesByVehicle[currentVehicle] = 0;
        }

        if (totalFeesByVehicle[currentVehicle] >= 60) {
            console.log(`${currentVehicle} has already reached the fee cap of 60.`);
            continue;
        }

        const currentTime = currentDateTime.split("T")[1];
        const currentFee = getCurrentFee(currentTime) || 0;

        console.log(`Current fee for ${currentVehicle}: ${currentFee}`);

        totalFeesByVehicle[currentVehicle] = Math.min(totalFeesByVehicle[currentVehicle] + currentFee, 60);
    }

    return totalFeesByVehicle;
}

const tolls = TollCalculator();
console.log('Total fees:', tolls);
