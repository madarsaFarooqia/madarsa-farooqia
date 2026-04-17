import {
  seedTeachers,
  seedStudents,
  seedEvents,
  seedCampaigns,
  seedFundraisingCampaigns,
  seedDonations,
  seedRegistrations,
} from './fixtures';

function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}

let teachers;
let students;
let events;
let campaigns;
let fundraisingCampaigns;
let donations;
let registrations;
let donationIdSeq = 1000;

export function resetMockStores() {
  teachers = deepClone(seedTeachers);
  students = deepClone(seedStudents);
  events = deepClone(seedEvents);
  campaigns = deepClone(seedCampaigns);
  fundraisingCampaigns = deepClone(seedFundraisingCampaigns);
  donations = deepClone(seedDonations);
  registrations = deepClone(seedRegistrations);
  donationIdSeq = 1000;
}

function ensure() {
  if (!teachers) resetMockStores();
}

export function getTeachers() {
  ensure();
  return teachers;
}
export function getStudents() {
  ensure();
  return students;
}
export function getEvents() {
  ensure();
  return events;
}
export function getCampaigns() {
  ensure();
  return campaigns;
}
export function getFundraisingCampaigns() {
  ensure();
  return fundraisingCampaigns;
}
export function getDonations() {
  ensure();
  return donations;
}
export function getRegistrations() {
  ensure();
  return registrations;
}

export function nextDonationId() {
  donationIdSeq += 1;
  return `d-mock-${donationIdSeq}`;
}
