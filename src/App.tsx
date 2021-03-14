import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Cog, Globe } from 'heroicons-react';

import Calendar from './components/calendar/Calendar'
import FilterButton from './components/calendar/FilterButton'
import EventSelectorButton from './components/calendar/EventSelectorButton'
import Navbar from './components/Navbar'
import { FlexRow } from './components/common/FlexLayout'
import { eventColors, eventDates } from './util/constants'
import { hasPrevDay, hasNextDay } from './util/helper'
import { TEventType, TEventCategory } from './util/types'

import './App.css'
import moment from 'moment';
import DynamicFlexLayout from './components/common/DynamicFlexLayout';

const App: React.FC = () => {
  const [curDay, setCurDay] = useState(moment(eventDates['gear_up'].start_time))
  const [filter, setFilter] = useState<TEventType | null>(null)
  const [activeTab, setActiveTab] = useState<TEventCategory>("gear_up")

  // Persist and fetch the last day we visited
  useEffect(() => {
    const fetchedData: string | null = localStorage.getItem('curday')
    if (!fetchedData) {
      return
    }

    setCurDay(moment(JSON.parse(fetchedData)))
  }, [])

  // on tab change, set start date
  useEffect(() => {
    setCurDay(moment(eventDates[activeTab].start_time))
  }, [activeTab])

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
        <FlexRow style={{ marginBottom: 20 }}>
          <EventSelectorButton 
            isSelected={activeTab === "gear_up"}
            onClick={() => setActiveTab("gear_up")}
          >
            <Cog style={IconStyle}/>
            <span>Gear Up</span>
          </EventSelectorButton>
          <EventSelectorButton 
            isSelected={activeTab === "htn"}
            onClick={() => setActiveTab("htn")}
          >
            <Globe style={IconStyle}/>
            <span>Hack the North</span> 
          </EventSelectorButton>
        </FlexRow>
        <FlexRow style={{ justifyContent: 'space-between', marginBottom: 30 }}>
          <FlexRow style={{ gap: 10 }}>
            <RoundButton
              enabled={hasPrevDay(activeTab, curDay)} 
              onClick={() =>  { if (hasPrevDay(activeTab, curDay)) { prevDay() }}}
            >
              <ChevronLeft/>
            </RoundButton>
            <Date>{curDay.format("dddd, MMM DD")}</Date>
            <RoundButton 
              enabled={hasNextDay(activeTab, curDay)} 
              onClick={() =>  { if (hasNextDay(activeTab, curDay)) { nextDay() }}}
            >
              <ChevronRight/>
            </RoundButton>
          </FlexRow>
          <DynamicFlexLayout>
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
          </DynamicFlexLayout>
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
  color: ${(p: { enabled: boolean }) => p.enabled ? "#48484A": "white"};
  cursor: ${(p: { enabled: boolean }) => p.enabled ? "pointer" : "default"};
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
  ${(p: { enabled: boolean }) => p.enabled ? 
  `&:hover { 
    background-color: #F2F2F7; 
  }` : ""}
`

const IconStyle = {
  height: 12,
  width: 12,
  marginRight: 5,
  marginTop: 1
}

export default App;
