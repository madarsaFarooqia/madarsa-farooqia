import { teacherService } from './teacherService';
import { studentService } from './studentService';
import { eventService } from './eventService';
import { campaignService } from './campaignService';
import { donationService } from './donationService';
import { registrationService } from './registrationService';

/**
 * Maps EntityManager `entityName` props to service modules.
 */
export const entityServiceByName = {
  Teacher: teacherService,
  Student: studentService,
  Event: eventService,
  Campaign: campaignService,
  Donation: donationService,
  Registration: registrationService,
};

export function getEntityService(entityName) {
  const svc = entityServiceByName[entityName];
  if (!svc) {
    throw new Error(`No service registered for entity "${entityName}"`);
  }
  return svc;
}
