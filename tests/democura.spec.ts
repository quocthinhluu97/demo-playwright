import { test } from "@fixtures/base.fixture";
import { AppointmentFormModel, compareAppointments } from '@models/appointment-form.model';
import { TimeUtils } from '@utils/time.util';
import { JsonUtils } from '@utils/json.util'

test.describe.configure({ mode: 'serial'});

const now = TimeUtils.now();
const appointment: AppointmentFormModel = JsonUtils.read('data/appointments.json')[0];
appointment.visitDate = TimeUtils.now().toJSDate() as string;

test('Book an appointment', async ({ bookAppointmentPage, summaryPage }) => {
  await bookAppointmentPage.sectionHeader.makeAppointment();
  await bookAppointmentPage.fill(appointment);
  await bookAppointmentPage.bookAppointment();
  await summaryPage.verifyAppointmentConfirmed();
});

test('Check appointment history', async({ summaryPage, historyPage }) => {
  await summaryPage.sectionHeader.navigationMenu.goToHistoryPage();
  const returnedAppointmentInfo = await historyPage.getAppointmentByDate(now.toFormat('dd/MM/yyyy'));
  const originalAppointmentInfo = {...appointment};
  originalAppointmentInfo.visitDate = now.toFormat('dd/MM/yyyy');
  await compareAppointments(originalAppointmentInfo, returnedAppointmentInfo);
});