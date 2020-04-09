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
  const availableBeds = Math.trunc(0.35 * totalHospitalBeds);
  return availableBeds - severeCasesByRequestedTime;
};

const getDollarsInFlight = (
  infectionsByRequestedTime,
  population,
  income,
  days
) => (infectionsByRequestedTime * population * income * days).toFixed(2);

export {
  getDollarsInFlight,
  getHospitalBedsByRequestedTime,
  getInfectionsByRequestedTime,
  getRequestedTimeInDays
};