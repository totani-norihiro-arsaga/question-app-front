import surveyApi from "../../api/survey";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Survey } from "../../types/survey";
import ReactPaginate from "react-paginate";

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

const SurveyIndex:React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const fetchData = async () => {
    const data = await surveyApi.index();
    setSurveys(data);
  };

  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = surveys.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(surveys.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % surveys.length;
    setItemOffset(newOffset);
  }
    useEffect(() => {
      fetchData();
    }, []);

    return (
      <>
        <SurveyListContainer>
          <h2>Survey List</h2>
          <ul>
            {currentItems.map((survey) => (
              <SurveyListItem key={survey.id}>
                <SurveyLink to={`/survey/${survey.id}`}>
                  {survey.title}
                </SurveyLink>{" "}
                (Created: {new Date(survey.createdDate).toLocaleString()})
              </SurveyListItem>
            ))}
          </ul>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
        </SurveyListContainer>
      </>
    );
};
export default SurveyIndex;
