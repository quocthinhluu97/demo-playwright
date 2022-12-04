import { Facilities, HealthcarePrograms } from '@pages/enums';
import { test } from "@fixtures/base.fixture";
import { DateTime } from "luxon";

test('Book an appointment', async ({ bookAppointmentPage }) => {
  await bookAppointmentPage.makeAppointment();

  await bookAppointmentPage.fill({
    facility: Facilities.HONGKONG,
    hospitalReadmission: true,
    healthcareProgram: HealthcarePrograms.MEDICARE,
    visitDate: DateTime.now().toJSDate(),
    comment: 'I told you I was sick',
  });

  const summaryPage = await bookAppointmentPage.bookAppointment();
  await summaryPage.verifyAppointmentConfirmed();
});
