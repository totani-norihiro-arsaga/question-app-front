import surveyApi from "../../api/survey";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../error/NotFoutd";
import { APP_DOMAIN } from "../../constants";
import { SurveyDetail } from "../../types/survey";

const SurveyShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveyDetail | null>(null);
  const [totalAnsweredAmount, settotalAnsweredAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) {
          throw new Error("アンケートのIDが指定されておりません。");
        }
        const showSurveryResponse = await surveyApi.showWithAnswers(id);
        setSurvey(showSurveryResponse.survey);
        settotalAnsweredAmount(showSurveryResponse.total_answered_amount);
      } catch (error) {
        setError(true);
      }
    };
    getData();
  }, []);

  if (error || !id) {
    return <NotFound />;
  }
  return (
    <>
      <h1>タイトル:{survey?.surveyTitle}</h1>
      <p>合計回答数:{totalAnsweredAmount}</p>
      {survey?.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h2>
            質問{questionIndex + 1}:{question.questionText}
          </h2>
          {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <p>{choice.choiceText}</p>
              <p>
                回答数:{choice.total_ansered_amount}, 回答率:
                {(
                  (choice.total_ansered_amount / totalAnsweredAmount) *
                  100
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ))}
      <h2>url</h2>
      <p>
        {APP_DOMAIN}survey/{survey?.surveyId}
      </p>
    </>
  );
};
export default SurveyShow;

