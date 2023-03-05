import { Facilities, HealthcarePrograms } from '@pages/enums';
import { expect, test } from "@fixtures/base.fixture";
import { DateTime } from "luxon";
import { Paths } from '@constants/paths';
import { EnvironmentUtils } from '@utils/environment.util';
import { AppointmentFormModel } from '@models/appointment-form.model';
import { AppointmentUtils } from '@utils/appointment.util';

test.describe.configure({ mode: 'serial'});

const appointmentInfo: Partial<AppointmentFormModel> = {
  facility: Facilities.HONGKONG,
  hospitalReadmission: true,
  healthcareProgram: HealthcarePrograms.MEDICARE,
  visitDate: DateTime.now().toJSDate(),
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
  const returnedAppointmentInfo = await historyPage.getAppointmentByDate(appointmentInfo.visitDate);
  await AppointmentUtils.compare(appointmentInfo, returnedAppointmentInfo);
});