import axios from 'axios';

const END_POINT = 'http://localhost:3000/survey';

const surveyApi = {
    async index() {
        const result = await axios.get(END_POINT + `/index`);

        return result.data;
    }
}

export default surveyApi;