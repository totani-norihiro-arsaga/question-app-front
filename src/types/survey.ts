export type Survey = {
  id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  questions: Question[];
};
export type Question = {
  id: number;
  questionText: string;
  responseFormat: number;
  createdDate: string;
  updatedDate: string;
  surveyId: string;
  choices: Choice[];
};

export type Choice = {
  id: number;
  choiceText: string;
  createdDate: string;
  updatedDate: string;
  questionId: number;
};

export type Answer = {
  surveyId: string | null;
  contens: { [key: number]: number | null };
};

export type ChoiceInSurveyDetail = {
  choiceText: string;
  total_ansered_amount: number;
};

export type QuestionInSurveyDetail = {
  questionText: string;
  choices: ChoiceInSurveyDetail[];
};

export type SurveyDetail = {
  surveyId: string;
  surveyTitle: string;
  createdAt: Date;
  questions: QuestionInSurveyDetail[];
};

export type ShowSurveyRespose = {
  survey: SurveyDetail;
  total_answered_amount: number;
};

export type ChoiceInForm = Pick<Choice, "choiceText">;

export type QuestionInForm = {
  questionText:string;
  responseFormat:number;
  choices:ChoiceInForm[];
}

export type SurveyForm = {
  title:string;
  questions: QuestionInForm[];
}