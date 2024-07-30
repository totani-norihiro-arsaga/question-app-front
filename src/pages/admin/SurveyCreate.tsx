import React, { useState } from "react";
import styled from "styled-components";
import { SurveyForm } from "../../types/survey";
import surveyApi from "../../api/survey";
import { Link } from "react-router-dom";
import { APP_DOMAIN } from "../../constants";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  `;

const FormContainer = styled.div`
  padding: 20px;
  max-width: 700px;
  height: 550px;
  width: 100%;
  margin: 20px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  max-height: 100%;
  overflow-y: auto;
  width: 100%;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 7px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  color: white;
  &:hover {
    background-color: #5a6268;
  }
  a {
    padding: 10px 20px;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const ChoiceContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 15px;
`;

const CreateSurvey: React.FC = () => {
  const [survey, setSurvey] = useState<SurveyForm>({
    title: "",
    questions: [
      {
        questionText: "",
        responseFormat: 1,
        choices: [
          {
            choiceText: "",
          },
        ],
      },
    ],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurvey({ ...survey, title: e.target.value });
  };

  const handleQuestionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...survey.questions];
    newQuestions[index].questionText = e.target.value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const handleChoiceChange = (
    qIndex: number,
    choiceIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].choices[choiceIndex].choiceText = e.target.value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const addQuestion = () => {
    setSurvey({
      ...survey,
      questions: [
        ...survey.questions,
        {
          questionText: "",
          responseFormat: 1,
          choices: [],
        },
      ],
    });
  };

  const addChoice = (index: number) => {
    const newQuestions = [...survey.questions];
    newQuestions[index].choices.push({ choiceText: "" });
    setSurvey({ ...survey, questions: newQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const status = await surveyApi.create(survey);
    if(status === 201) {
      window.location.href = APP_DOMAIN + `admin/survey/index`;
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>アンケートタイトル</Label>
            <Input
              type="text"
              value={survey.title}
              onChange={handleTitleChange}
            />
          </FormGroup>
          {survey.questions.map((question, questionIndex) => (
            <FormGroup key={questionIndex}>
              <Label>質問{questionIndex + 1}</Label>
              <Input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, e)}
              />
              <ChoiceContainer>
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex}>
                    <Label>選択肢{choiceIndex + 1}</Label>
                    <Input
                      type="text"
                      value={choice.choiceText}
                      onChange={(e) =>
                        handleChoiceChange(questionIndex, choiceIndex, e)
                      }
                    />
                  </div>
                ))}
                <Button type="button" onClick={() => addChoice(questionIndex)}>
                  選択肢+
                </Button>
              </ChoiceContainer>
              <Button type="button" onClick={addQuestion}>
                質問+
              </Button>
            </FormGroup>
          ))}
          <SubmitButtonContainer>
            <Button type="submit">アンケートを作成</Button>
            <BackButton type="button">
              <Link to="/admin/home">ホーム</Link>
            </BackButton>
          </SubmitButtonContainer>
        </Form>
      </FormContainer>
    </PageContainer>
  );
};

export default CreateSurvey;
