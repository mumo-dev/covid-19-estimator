import {
  getRequestedTimeInDays,
  getInfectionsByRequestedTime,
  getHospitalBedsByRequestedTime,
  getDollarsInFlight
} from './utils';

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
    0.5 * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.2 * infectionsByRequestedTime
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
    0.5 * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    0.2 * infectionsByRequestedTime
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
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.7
//   },
//   periodType: 'days',
//   timeToElapse: 3,
//   reportedCases: 4,
//   population: 66622705,
//   totalHospitalBeds: 1000
// };

// // eslint-disable-next-line no-console
// console.log(covid19ImpactEstimator(data));
