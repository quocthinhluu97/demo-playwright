import { Facilities, HealthcarePrograms } from '@constants/appointment.enum';
import { test } from "@fixtures/base.fixture";
import { AppointmentFormModel, compareAppointments } from '@models/appointment-form.model';
import { TimeUtils } from '@utils/appointment.util';

test.describe.configure({ mode: 'serial'});

const now = TimeUtils.now();

const appointmentInfo: AppointmentFormModel = {
  facility: Facilities.HONGKONG,
  hospitalReadmission: true,
  healthcareProgram: HealthcarePrograms.MEDICARE,
  visitDate: now.toJSDate() as string,
  comment: 'I told you I was sick',
};

test('Book an appointment', async ({ bookAppointmentPage, summaryPage }) => {
  await bookAppointmentPage.sectionHeader.makeAppointment();
  await bookAppointmentPage.fill(appointmentInfo);
  await bookAppointmentPage.bookAppointment();
  await summaryPage.verifyAppointmentConfirmed();
});

test('Check appointment history', async({ summaryPage, historyPage }) => {
  await summaryPage.sectionHeader.navigationMenu.goToHistoryPage();
  const returnedAppointmentInfo = await historyPage.getAppointmentByDate(now.toFormat('dd/MM/yyyy'));
  const originalAppointmentInfo = {...appointmentInfo };
  originalAppointmentInfo.visitDate = now.toFormat('dd/MM/yyyy');
  await compareAppointments(originalAppointmentInfo, returnedAppointmentInfo);
});