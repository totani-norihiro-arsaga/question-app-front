import surveyApi from "../../api/survey";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Survey } from "../../types/survey";
import NotFound from "../error/NotFoutd";
import { APP_DOMAIN } from "../../constants";

const SurveyShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) {
          throw new Error("アンケートのIDが指定されておりません。");
        }
        const result = await surveyApi.show(id);
        setSurvey(result);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  },[]);

  if (error || !id) {
    return <NotFound />;
  }
  return (
    <>
      <h1>タイトル:{survey?.title}</h1>
      {survey?.questions.map((question, index) => (
        <div key={question.id}>
          <h2>質問{index + 1}:{question.questionText}</h2>
          {question.choices.map((choice) => (
            <div key={choice.id}>{choice.choiceText}</div>
          ))}
        </div>
      ))}
      <h2>url</h2>
      <p>{APP_DOMAIN}/survey/{survey?.id}</p>
    </>
  );
};
export default SurveyShow;
