import surveyApi from "../../api/survey";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../error/NotFoutd";
import { APP_DOMAIN } from "../../constants";
import { SurveyDetail } from "../../types/survey";
import styled from "styled-components";

const SurveyShowContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 600px;
`;

const Header = styled.header`
  background-color: #f4f4f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;

  h1 {
    margin: 0;
  }
`;

const QuestionSection = styled.section`
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 10px;
  text-align: left;

  h2 {
    color: #333;
  }
`;

const ChoiceArticle = styled.article`
  margin-left: 20px;
  margin-top: 10px;

  p {
    margin: 5px 0;
    font-weight: bold;
  }

  span {
    margin-left: 15px;
  }
`;

const Footer = styled.footer`
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 10px;
  text-align: left;

  h2 {
    margin-bottom: 5px;
  }
`;

const BackButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: right;

  a {
    padding: 10px 20px;
    background-color: #8d8d8d;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    &:hover {
      background-color: #333333;
    }
  }
`;

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
      <ContentWrapper>
        <Header>
          <h2>{survey?.surveyTitle}</h2>
          <span>合計回答数: {totalAnsweredAmount}</span>
        </Header>
        {survey?.questions.map((question, questionIndex) => (
          <QuestionSection key={questionIndex}>
            <h2>
              {questionIndex + 1}. {question.questionText}
            </h2>
            {question.choices.map((choice, choiceIndex) => (
              <ChoiceArticle key={choiceIndex}>
                <p>{choice.choiceText}</p>
                <span>
                  回答数: {choice.total_ansered_amount}, 回答率:{" "}
                  {totalAnsweredAmount &&
                    (
                      (choice.total_ansered_amount / totalAnsweredAmount) *
                      100
                    ).toFixed(2)}
                  %
                </span>
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
        <BackButton>
          <Link to="/admin/survey/index">一覧に戻る</Link>
        </BackButton>
      </ContentWrapper>
    </SurveyShowContainer>
  );
};

export default SurveyShow;
