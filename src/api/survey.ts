import axios from 'axios';

const END_POINT = 'http://localhost:3000/survey';
const PAGENATION_LIMIT_NUM = 2;

const surveyApi = {
    async index(page:number) {
        const result = await axios.get(END_POINT + `/index?page=${page}&limit=${PAGENATION_LIMIT_NUM}`);
        console.log(result.data);
        return result.data.data;
    }
}

export default surveyApi;