// import {
//   getRequestedTimeInDays,
//   getInfectionsByRequestedTime,
//   getHospitalBedsByRequestedTime,
//   getDollarsInFlight
// } from './utils';

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
) => Math.trunc((infectionsByRequestedTime * population * income) / days);

const calculateCovid19Impact = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const requestedTimeInDays = getRequestedTimeInDays(
    data.periodType,
    data.timeToElapse
  );
  const infectionsByRequestedTime = getInfectionsByRequestedTime(
    currentlyInfected,
    requestedTimeInDays
  );
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  const hospitalBedsByRequestedTime = getHospitalBedsByRequestedTime(
    data.totalHospitalBeds,
    severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = Math.trunc(
    0.05 * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * infectionsByRequestedTime
  );

  const dollarsInFlight = getDollarsInFlight(
    infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    requestedTimeInDays
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const calculateCovid19ImpactSevereImpact = (data) => {
  const currentlyInfected = data.reportedCases * 50;

  const requestedTimeInDays = getRequestedTimeInDays(
    data.periodType,
    data.timeToElapse
  );

  const infectionsByRequestedTime = getInfectionsByRequestedTime(
    currentlyInfected,
    requestedTimeInDays
  );

  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  const hospitalBedsByRequestedTime = getHospitalBedsByRequestedTime(
    data.totalHospitalBeds,
    severeCasesByRequestedTime
  );
  const casesForICUByRequestedTime = Math.trunc(
    0.05 * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * infectionsByRequestedTime
  );

  const dollarsInFlight = getDollarsInFlight(
    infectionsByRequestedTime,
    data.region.avgDailyIncomePopulation,
    data.region.avgDailyIncomeInUSD,
    requestedTimeInDays
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const impact = calculateCovid19Impact(data);
  const severeImpact = calculateCovid19ImpactSevereImpact(data);
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;

// const data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 4,
//     avgDailyIncomePopulation: 0.73
//   },
//   periodType: 'days',
//   timeToElapse: 38,
//   reportedCases: 2747,
//   population: 92931687,
//   totalHospitalBeds: 678874
// };

// // eslint-disable-next-line no-console
// console.log(covid19ImpactEstimator(data));
