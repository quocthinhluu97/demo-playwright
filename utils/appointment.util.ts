import { expect } from '@playwright/test';
import { AppointmentFormModel } from '@models/appointment-form.model';

export class AppointmentUtils {
    public static compare(a: Partial<AppointmentFormModel>, b: Partial<AppointmentFormModel>) {
        expect(a.facility).toBe(b.facility);
        expect(Boolean(a.hospitalReadmission)).toBe(Boolean(b.hospitalReadmission));
        expect(a.healthcareProgram).toBe(b.healthcareProgram);
        expect(a.comment).toBe(b.comment);
    }
}