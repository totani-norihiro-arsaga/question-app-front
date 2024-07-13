import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import surveyApi from '../../api/survey';
import { Survey, Answer } from '../../types/survey';
import NotFound from '../error/NotFoutd';

const SurveyForm: React.FC = () => {

  const {id} = useParams<{id:string}>();
  if(!id) {
    return <NotFound/>
  }

  const [answers, setAnswers] = useState<Answer>({surveyId:null});
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<boolean>(false);
  
  useEffect(()=>{
    const getData = async () => {
      try {
        const result = await surveyApi.show(id);
        setSurvey(result);
        setAnswers({surveyId:result.id})
      } catch (error) {
        setError(true)
      }
    }
    getData();
  },[])

  if(error) {
    return <NotFound/>
  }

  const handleAnswerChange = (questionId: number, choiceId: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    surveyApi.answer(answers);
  };

  console.log(survey);
  return (
    <form onSubmit={handleSubmit}>
      <h1>{survey?.title}</h1>
      {survey?.questions.map((question) => (
        <div key={question.id}>
          <h2>{question.questionText}</h2>
          {question.choices.map((choice) => (
            <div key={choice.id}>
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={choice.id}
                  checked={answers[question.id] === choice.id}
                  onChange={() => handleAnswerChange(question.id, choice.id)}
                />
                {choice.choiceText}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyForm;
