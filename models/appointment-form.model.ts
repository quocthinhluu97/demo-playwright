import { expect } from '@playwright/test';
export interface AppointmentFormModel {
    facility: string;
    hospitalReadmission: boolean | string;
    healthcareProgram: string;
    visitDate: string;
    comment: string;
}

export async function compareAppointments(a: AppointmentFormModel, b: AppointmentFormModel) {
    await expect(a.facility).toBe(b.facility);
    await expect(Boolean(a.hospitalReadmission)).toBe(Boolean(b.hospitalReadmission));
    await expect(a.healthcareProgram).toBe(b.healthcareProgram);
    await expect(a.comment).toBe(b.comment);
    await expect(a.visitDate).toBe(b.visitDate);
}