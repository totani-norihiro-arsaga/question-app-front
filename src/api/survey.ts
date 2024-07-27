import axios from 'axios';
import { Answer, Survey } from '../types/survey';

const END_POINT = 'http://localhost:3000/';

const surveyApi = {
    async index() {
        const result = await axios.get(END_POINT + `admin/survey/index`);

        return result.data;
    },

    async answer(answer:Answer):Promise<number> {
        const result = await axios.post(END_POINT + 'answer', answer);
        return result.status;
    },

    async show(id:string):Promise<Survey> {
        const result = await axios.get(END_POINT + `survey/${id}`);
        return result.data;
    }
}

export default surveyApi;