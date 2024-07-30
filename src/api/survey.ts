import axios from "axios";
import { Answer, ShowSurveyRespose, Survey, SurveyForm } from "../types/survey";
import { API_DOMAIN } from "../constants";

const surveyApi = {
  async index() {
    const result = await axios.get(API_DOMAIN + `admin/survey/index`);

    return result.data;
  },

  async showWithAnswers(id: string): Promise<ShowSurveyRespose> {
    const result = await axios.get(API_DOMAIN + `admin/survey/${id}`);
    return result.data;
  },

  async answer(answer: Answer): Promise<number> {
    const result = await axios.post(API_DOMAIN + "answer", answer);
    return result.status;
  },

  async show(id: string): Promise<Survey> {
    const result = await axios.get(API_DOMAIN + `survey/${id}`);
    return result.data;
  },

  async create(survey: SurveyForm): Promise<number> {
    const result = await axios.post(API_DOMAIN + `admin/survey/create`, survey);
    return result.status;
  }
};

export default surveyApi;
