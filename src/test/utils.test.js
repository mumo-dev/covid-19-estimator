import {
  getRequestedTimeInDays,
  getInfectionsByRequestedTime,
  getHospitalBedsByRequestedTime,
  getDollarsInFlight
} from '../utils';

test('tests if number of days in request data', () => {
  expect(getRequestedTimeInDays('days', 24)).toBe(24);
  expect(getRequestedTimeInDays('weeks', 4)).toBe(28);
  expect(getRequestedTimeInDays('months', 4)).toBe(120);
});

test('tests if the number of currently infected person in days', () => {
  expect(getInfectionsByRequestedTime(12, 28)).toBe(12 * 512);
  expect(getInfectionsByRequestedTime(12, 29)).toBe(12 * 512);
});
