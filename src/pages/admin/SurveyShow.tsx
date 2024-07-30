import surveyApi from "../../api/survey";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../error/NotFoutd";
import { APP_DOMAIN } from "../../constants";
import { SurveyDetail } from "../../types/survey";
import styled from "styled-components"; // styled-componentsをインポート

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
  }, [id]);

  if (error || !id) {
    return <NotFound />;
  }

  return (
    <SurveyShowContainer>
      <Header>
        <h1>タイトル: {survey?.surveyTitle}</h1>
      </Header>
      <p>合計回答数: {totalAnsweredAmount}</p>
      {survey?.questions.map((question, questionIndex) => (
        <QuestionSection key={questionIndex}>
          <h2>
            質問 {questionIndex + 1}: {question.questionText}
          </h2>
          {question.choices.map((choice, choiceIndex) => (
            <ChoiceArticle key={choiceIndex}>
              <p>{choice.choiceText}</p>
              <p>
                回答数: {choice.total_ansered_amount}, 回答率:{" "}
                {(
                  (choice.total_ansered_amount / totalAnsweredAmount) *
                  100
                ).toFixed(2)}
                %
              </p>
            </ChoiceArticle>
          ))}
        </QuestionSection>
      ))}
      <Footer>
        <h2>URL</h2>
        <p>
          {APP_DOMAIN}survey/{survey?.surveyId}
        </p>
      </Footer>
    </SurveyShowContainer>
  );
};

export default SurveyShow;

// styled-componentsの定義
const SurveyShowContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const Header = styled.header`
  background-color: #f4f4f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  h1 {
    margin: 0;
  }
`;

const QuestionSection = styled.section`
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 10px;

  h2 {
    color: #333;
  }
`;

const ChoiceArticle = styled.article`
  margin-left: 20px;
  margin-top: 10px;

  p {
    margin: 5px 0;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 10px;

  h2 {
    margin-bottom: 5px;
  }
`;
