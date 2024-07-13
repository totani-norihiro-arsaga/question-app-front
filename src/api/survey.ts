import axios from 'axios';
import { Answer, Survey } from '../types/survey';

const END_POINT = 'http://localhost:3000/survey';

const surveyApi = {
    async index() {
        const result = await axios.get(END_POINT + `/index`);

        return result.data;
    },

    async answer(answer:Answer):Promise<string> {
        const result = await axios.post(END_POINT + '/answer', answer);
        if(result.status === 201) {
            return '回答が完了しました。';
        }
        return '何かがおかしいようです。'
    },

    async show(id:string):Promise<Survey> {
        const result = await axios.get(END_POINT + `/${id}`);
        return result.data;
    }
}

export default surveyApi;