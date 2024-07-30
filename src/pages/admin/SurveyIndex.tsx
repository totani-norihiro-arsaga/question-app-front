import surveyApi from "../../api/survey";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Survey } from "../../types/survey";
import ReactPaginate from "react-paginate";

const ContentWSrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SurveyListContainer = styled.div`
  padding: 20px;
  width: 500px;
`;

const SurveyList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px;
  margin-top: 30px;
`;

const SurveyListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const SurveyLink = styled(Link)`
  color: blue;
  text-decoration: none;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const CreatedDate = styled.span`
  white-space: nowrap;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin-top: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;

  .pagination {
    list-style: none;
    padding: 0;
    margin-bottom: 0;
  }

  .page-item {
    margin: 0 5px;
  }

  .page-link {
    padding: 5px 10px;
    border: 1px solid #ddd;
    color: blue;
    text-decoration: none;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .active .page-link {
    background-color: #007bff;
    color: white;
    border: none;
  }
`;

const BackButton = styled.div`
  display: flex;
  justify-content: right;
  font-size: small;

  a {
    padding: 5px 10px;
    background-color: #8d8d8d;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    &:hover {
      background-color: #333333;
    }
  }
`;

const SurveyIndex: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const fetchData = async () => {
    const data = await surveyApi.index();
    setSurveys(data);
  };

  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = surveys.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(surveys.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % surveys.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(surveys.length === 0) {
    return (
      <ContentWSrapper>
        <h1>アンケートを作成して下さい。</h1>
      </ContentWSrapper>
    )
  }
  return (
    <ContentWSrapper>
      <SurveyListContainer>
        <h2>アンケートリスト</h2>
        <SurveyList>
          {currentItems.map((survey) => (
            <SurveyListItem key={survey.id}>
              <SurveyLink to={`/admin/survey/${survey.id}`}>
                {survey.title}
              </SurveyLink>{" "}
              <CreatedDate>
                ({new Date(survey.createdDate).toLocaleString()})
              </CreatedDate>
            </SurveyListItem>
          ))}
        </SurveyList>
      </SurveyListContainer>
      <Footer>
        <BackButton>
          <Link to="/admin/home">ホーム</Link>
        </BackButton>
        <PaginationContainer>
          <ReactPaginate
            previousLabel="前"
            nextLabel="次"
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
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
          />
        </PaginationContainer>
      </Footer>
    </ContentWSrapper>
  );
};

export default SurveyIndex;
