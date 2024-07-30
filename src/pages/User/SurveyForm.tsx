import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import surveyApi from "../../api/survey";
import { Survey, Answer } from "../../types/survey";
import NotFound from "../error/NotFoutd";
import Complete from "../Common/Complete";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
`;

const StyledForm = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Question = styled.div`
  margin-bottom: 20px;
`;

const QuestionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Choice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SurveyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<Answer>({
    surveyId: null,
    contens: {},
  });
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [complete, setComplete] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies([id ?? "undecided"]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) {
          throw new Error("アンケートのIDが指定されておりません。");
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
  }, [id]);

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
      setCookies(id!, true, { expires: new Date(Date.now() + 3600000 * 24 * 365) });
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
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <Title>{survey?.title}</Title>
        {survey?.questions.map((question) => (
          <Question key={question.id}>
            <QuestionTitle>{question.questionText}</QuestionTitle>
            {question.choices.map((choice) => (
              <Choice key={choice.id}>
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
              </Choice>
            ))}
          </Question>
        ))}
        <StyledButton type="submit">回答</StyledButton>
      </StyledForm>
    </Container>
  );
};

export default SurveyForm;
