export interface Survey {
    id: string;
    title: string;
    createdDate: string;
    updatedDate: string;
    questions: Question[];
  }
  export interface Question {
    id: number;
    questionText: string;
    responseFormat: number;
    createdDate: string;
    updatedDate: string;
    surveyId: string;
    choices: Choice[];
  }
  
  export interface Choice {
    id: number;
    choiceText: string;
    createdDate: string;
    updatedDate: string;
    questionId: number;
  }

  export interface Answer {
    surveyId: string | null,
    contens:{[key: number]: number | null}
  }