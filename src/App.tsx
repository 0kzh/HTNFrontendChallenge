import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'heroicons-react';

import Calendar from './components/calendar/Calendar'
import { FlexRow } from './components/common/FlexLayout'

import './App.css'
import moment from 'moment';

const App: React.FC = () => {
  const [curDay, setCurDay] = useState(moment(1610438400000))  

  useEffect(() => {
    console.log(curDay)
  }, [curDay])

  return (
    <div className="App">
      <div>
        <h1>Event Calendar</h1>
        <FlexRow style={{ gap: 10, marginBottom: 30 }}>
          <RoundButton onClick={() => setCurDay(curDay.clone().subtract(1, 'd'))}>
            <ChevronLeft/>
          </RoundButton>
          <Date>{curDay.format("dddd, MMM DD")}</Date>
          <RoundButton onClick={() => setCurDay(curDay.clone().add(1, 'd'))}>
            <ChevronRight/>
          </RoundButton>
        </FlexRow>
      </div>
      <Calendar curDay={curDay} />
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
