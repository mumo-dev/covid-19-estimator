// input
// {
//     region: {
//         name: "Africa",
//         avgAge: 19.7,
//         avgDailyIncomeInUSD: 5,
//         avgDailyIncomePopulation: 0.71
//     },
//     periodType: "days",
//     timeToElapse: 58,
//     reportedCases: 674,
//     population: 66622705,
//     totalHospitalBeds: 1380614
// }

// output
// {
//     data: {},
//     impact: {},
//     severeImpact: {}
//     // the input data you got
//     // your best case estimation
//     // your severe case estimation
// }

// const getReportedCases = (reportedCase)

const getRequestedTimeInDays = (periodType, timeToElapse) => {
  let numberOfDays;

  switch (periodType) {
    case 'days':
      numberOfDays = timeToElapse;
      break;

    case 'weeks':
      numberOfDays = timeToElapse / 7;
      break;

    case 'months':
      numberOfDays = timeToElapse / 30;
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
) => infectionsByRequestedTime * population * income * days;

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
  const severeCasesByRequestedTime = Math.trunc(
    0.15 * infectionsByRequestedTime
  );
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
    severeCasesByRequestedTime,
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

  const severeCasesByRequestedTime = Math.trunc(
    0.15 * infectionsByRequestedTime
  );

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
    severeCasesByRequestedTime,
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
//     region: {
//         name: "Africa",
//         avgAge: 19.7,
//         avgDailyIncomeInUSD: 5,
//         avgDailyIncomePopulation: 0.7
//     },
//     periodType: "days",
//     timeToElapse: 28,
//     reportedCases: 4,
//     population: 66622705,
//     totalHospitalBeds: 1000
// }

// console.log(covid19ImpactEstimator(data));
