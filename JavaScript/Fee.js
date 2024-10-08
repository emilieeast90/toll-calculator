import fees from './data/fees.js';
import dates from './data/dates.js';
import getVehicle from './Vehicle.js';

export function getDateTime() {
    let parsedTimeList = [];
    let previousTimeInMinutes = null;

    for (let i = 0; i < dates.length; i++) {
        let currentDateTime = dates[i].date;
        let currentVehicle = dates[i].vehicle;
        let currentDay = currentDateTime.split("T")[0];

        let dateObject = new Date(currentDay);
        if (isNaN(dateObject)) {
            continue;
        }

        let currentWeekDay = dateObject.getDay();
        if (getVehicle(currentVehicle) || currentWeekDay === 0 || currentWeekDay === 6) {
            continue;
        }

        let currentTimeInHoursMinutesSeconds = currentDateTime.split("T")[1];
        parsedTimeList.push(currentTimeInHoursMinutesSeconds);

        let [hours, minutes] = currentTimeInHoursMinutesSeconds.split(":").map(Number);
        let currentTimeInMinutes = hours * 60 + minutes;

        if (previousTimeInMinutes !== null && (currentVehicle === 'Car' || currentVehicle === 'Truck')) {
            let timeDifference = currentTimeInMinutes - previousTimeInMinutes;
            if (timeDifference >= 60) {
                previousTimeInMinutes = currentTimeInMinutes;
            }
        } else {
            previousTimeInMinutes = currentTimeInMinutes;
        }
    }
}

export function getCurrentFee(time) {
    let currentFee = 0;

    for (let i = 0; i < fees.length; i++) {
        const fee = fees[i].fee;
        const currentStartTime = fees[i].start_time;
        const currentEndTime = fees[i].end_time;

        if (!fee || !currentStartTime || !currentEndTime) {
            continue;
        }

        if (time >= currentStartTime && time <= currentEndTime) {
            currentFee = fee;
            break;
        }
    }

    return currentFee;
}

getCurrentFee();
getDateTime();

export default getCurrentFee;
