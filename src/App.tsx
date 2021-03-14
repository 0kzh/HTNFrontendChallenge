import React from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'heroicons-react';

import Calendar from './components/Calendar'
import { FlexRow } from './components/common/FlexLayout'

import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <h1>Event Calendar</h1>
        <FlexRow style={{ gap: 10, marginBottom: 30 }}>
          <RoundButton>
            <ChevronLeft/>
          </RoundButton>
          <Date>Saturday, March 13</Date>
          <RoundButton>
            <ChevronRight/>
          </RoundButton>
        </FlexRow>
      </div>
      <Calendar />
    </div>
  );
}

const Date = styled.div`
  color: #111827;
  font-weight: 600;
`

const RoundButton = styled.div`
  border-radius: 50%;
  color: #48484A;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: #F2F2F7; 
  }
`

export default App;
