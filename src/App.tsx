import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'heroicons-react';

import Calendar from './components/calendar/Calendar'
import FilterButton from './components/calendar/FilterButton'
import Navbar from './components/Navbar'
import { FlexRow  } from './components/common/FlexLayout'
import { eventColors } from './util/constants'
import { TEventType } from './util/types'

import './App.css'
import moment from 'moment';

const App: React.FC = () => {
  const [curDay, setCurDay] = useState(moment(1610438400000))
  const [filter, setFilter] = useState<TEventType | null>(null)

  // Persist and fetch the last day we're on
  useEffect(() => {
    const fetchedData: string | null = localStorage.getItem('curday')
    if (!fetchedData) {
      return
    }

    setCurDay(moment(JSON.parse(fetchedData)))
  }, [])

  const prevDay = () => {
    const newDay = curDay.clone().subtract(1, 'd')
    setCurDay(newDay)
    localStorage.setItem('curday', JSON.stringify(newDay.valueOf()))
  }

  const nextDay = () => {
    const newDay = curDay.clone().add(1, 'd')
    setCurDay(curDay.clone().add(1, 'd'))
    localStorage.setItem('curday', JSON.stringify(newDay.valueOf()))
  }

  return (
    <div className="App">
      <div className="container">
        <Navbar style={{marginBottom: 50, justifyContent: 'space-between' }} />
        <Title>Event Calendar</Title>
        <FlexRow style={{ justifyContent: 'space-between', marginBottom: 30 }}>
          <FlexRow style={{ gap: 10 }}>
            <RoundButton onClick={prevDay}>
              <ChevronLeft/>
            </RoundButton>
            <Date>{curDay.format("dddd, MMM DD")}</Date>
            <RoundButton onClick={nextDay}>
              <ChevronRight/>
            </RoundButton>
          </FlexRow>
          <FlexRow>
            <FilterButton
              color={eventColors["workshop"]} 
              text="Workshop" 
              isSelected={filter === "workshop"} 
              onClick={() => filter === "workshop" ? setFilter(null) : setFilter("workshop")}
            />
            <FilterButton
              color={eventColors["activity"]} 
              text="Activity" 
              isSelected={filter === "activity"} 
              onClick={() => filter === "activity" ? setFilter(null) : setFilter("activity")}
            />
            <FilterButton
              color={eventColors["tech_talk"]} 
              text="Tech Talk" 
              isSelected={filter === "tech_talk"} 
              onClick={() => filter === "tech_talk" ? setFilter(null) : setFilter("tech_talk")}
            />
          </FlexRow>
        </FlexRow>
      </div>
      <Calendar curDay={curDay} filter={filter} />
    </div>
  );
}

const Title = styled.h1`
  color: #111827;
  font-size: 28px; 
  margin-left: 5px;
`

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
