export interface AppointmentFormModel {
    facility: string;
    hospitalReadmission: boolean | string;
    healthcareProgram: string;
    visitDate: Date;
    comment: string;
}