import surveyApi from "../../api/survey";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Survey } from "../../types/survey";

const SurveyListContainer = styled.div`
  padding: 20px;
`;

const SurveyListItem = styled.li`
  margin: 10px 0;
`;

const SurveyLink = styled(Link)`
  color: blue;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SurveyIndex: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await surveyApi.index(2);
      setSurveys(data);
    };

    fetchData();
  }, []);

  return (
    <SurveyListContainer>
      <h2>Survey List</h2>
      <ul>
        {surveys.map(survey => (
          <SurveyListItem key={survey.id}>
            <SurveyLink to={`/survey/${survey.id}`}>
              {survey.title}
            </SurveyLink> (Created: {new Date(survey.createdDate).toLocaleString()})
          </SurveyListItem>
        ))}
      </ul>
    </SurveyListContainer>
  );
};

export default SurveyIndex;
