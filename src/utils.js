const getRequestedTimeInDays = (periodType, timeToElapse) => {
  let numberOfDays;

  switch (periodType.trim().toLowerCase()) {
    case 'days':
      numberOfDays = timeToElapse;
      break;

    case 'weeks':
      numberOfDays = timeToElapse * 7;
      break;

    case 'months':
      numberOfDays = timeToElapse * 30;
      break;

    default:
      throw new Error(`Invalid Period Type ${periodType}`);
  }

  return Math.trunc(numberOfDays);
};

const getInfectionsByRequestedTime = (
  currentlyInfected,
  requestedTimeInDays
) => {
  const factor = Math.trunc(requestedTimeInDays / 3);
  return currentlyInfected * 2 ** factor;
};

const getHospitalBedsByRequestedTime = (
  totalHospitalBeds,
  severeCasesByRequestedTime
) => {
  const availableBeds = 0.35 * totalHospitalBeds;
  return Math.trunc(availableBeds - severeCasesByRequestedTime);
};

const getDollarsInFlight = (
  infectionsByRequestedTime,
  population,
  income,
  days
) => {
  const result = (infectionsByRequestedTime * population * income * days)
    / 1000000000000000000000000000000000000000000000000000;
  return result;
};

export {
  getDollarsInFlight,
  getHospitalBedsByRequestedTime,
  getInfectionsByRequestedTime,
  getRequestedTimeInDays
};

// console.log(getDollarsInFlight(2, 3, 2, 2));
