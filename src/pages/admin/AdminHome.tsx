import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

const AdminHome:React.FC = () => {
    return (
        <CenteredDiv>
            <h1>アンケートアプリ</h1>
            <p><Link to='/admin/survey/index'>一覧</Link></p>
            <p><Link to='/admin/survey/create'>新規作成</Link></p>
        </CenteredDiv>
    );
}

export default AdminHome;
