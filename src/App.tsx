import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'heroicons-react';

import Calendar from './components/calendar/Calendar'
import FilterButton from './components/calendar/FilterButton'
import { FlexRow  } from './components/common/FlexLayout'
import { eventColors } from './util/constants'
import { TEventType } from './util/types'

import './App.css'
import moment from 'moment';

const App: React.FC = () => {
  const [curDay, setCurDay] = useState(moment(1610438400000))
  const [filter, setFilter] = useState<TEventType | null>(null)

  useEffect(() => {
    console.log(filter)
  }, [filter])

  return (
    <div className="App">
      <div>
        <h1>Event Calendar</h1>
        <FlexRow style={{ justifyContent: 'space-between', marginBottom: 30 }}>
          <FlexRow style={{ gap: 10 }}>
            <RoundButton onClick={() => setCurDay(curDay.clone().subtract(1, 'd'))}>
              <ChevronLeft/>
            </RoundButton>
            <Date>{curDay.format("dddd, MMM DD")}</Date>
            <RoundButton onClick={() => setCurDay(curDay.clone().add(1, 'd'))}>
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
