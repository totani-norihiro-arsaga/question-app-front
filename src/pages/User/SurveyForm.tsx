import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import surveyApi from "../../api/survey";
import { Survey, Answer } from "../../types/survey";
import NotFound from "../error/NotFoutd";
import Complete from "../Common/Complete";

const SurveyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<Answer>({
    surveyId: null,
    contens: {},
  });
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [complete, setComplete] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies([id ?? 'undecided']);
  
  useEffect(() => {
    const getData = async () => {
      try {
        if(!id) {
          throw new Error('アンケートのIDが指定されておりません。');
        }
        const result = await surveyApi.show(id);
        const contents: { [key: number]: number | null } = {};
        result.questions.forEach((element) => {
          contents[element.id] = element.choices[0].id;
        });
        setSurvey(result);
        setAnswers({ ...answers, surveyId: result.id, contens: contents });
      } catch (error) {
        setError(true);
      }
    };
    getData();
  });

  const handleAnswerChange = (questionId: number, choiceId: number) => {
    const newContents = answers.contens;
    newContents[questionId] = choiceId;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      contens: newContents,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const statusCode = await surveyApi.answer(answers);
    if (statusCode === 201) {
      setCookies(id!, true, {expires: new Date(Date.now() + 3600000 * 24 * 365)});
      setComplete(true);
    }
  };

  if (error || !id) {
    return <NotFound />;
  }

  if (complete || cookies[id]) {
    return <Complete operation="アンケートの回答" />;
  }

  return (
    <>
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
                    checked={answers.contens[question.id] === choice.id}
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
    </>
  );
};

export default SurveyForm;
