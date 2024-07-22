export interface ExaminationsGetAll {
    examinations: ExaminationsGetAllExaminations[]
}

export interface ExaminationsGetAllExaminations {
    examinationID: number;
    name: string;
}
