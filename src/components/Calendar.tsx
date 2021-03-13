import React, { useState } from 'react'
import styled from 'styled-components'
import { range, convert24HTo12H, timestampToCol, sameDate } from '../util/helper'
import eventData from "../assets/data.json";
import { TEvent } from '../util/types';
const moment = require('moment');

interface Props {}
const startHour = 0
const endHour = 23

const hours = range(startHour, endHour)

const events: TEvent[] = eventData["data"]["events"] as TEvent[]

const CalendarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${(endHour - startHour + 1) * 2}, 1fr);
    width: max-content;
    height: 100%;
    margin: auto;
`

const Divider = styled.span`
    border-left: 1px solid lightgrey;
    grid-row: 1 / span 5;
    grid-column: ${(props: { column: number} ) => props.column};
`

const Heading = styled.span`
    grid-column: ${(props: { column: number} ) => props.column};
    grid-row: 1;
`

interface EventProps {
    row: number;
    column: number;
    span: number;
}

const Event = styled.div`
    color: white;
    background: #b03532;
    border-radius: 5px;
    grid-row: ${(p: EventProps ) => p.row};
    grid-column: ${(p: EventProps ) => p.column} / span ${(p : EventProps) => p.span}
`

const Calendar: React.FC = (props: Props) => {
    const {} = props

    const [curDay, setCurDay] = useState(moment(1610438400000))

    const renderDividers = () => 
        hours.map((hour, i) => 
            <Divider column={i + 1}/>
        )

    const renderHeadings = () => 
        hours.map((hour, i) => 
            <Heading column={i + 1}>{convert24HTo12H(hour)}</Heading>
        )

    const renderEvents = () => 
        events.filter((e: TEvent) => sameDate(curDay, moment(e.start_time))).map((event: TEvent, i) =>
            <Event 
                column={timestampToCol(event.start_time)}
                span={timestampToCol(event.end_time) - timestampToCol(event.start_time) + 1}
                row={event.row + 1}>{event.name}</Event>
        )

    return (
        <div style={{ overflow: 'scroll' }}>
            <CalendarWrapper>
                {renderDividers()}
                {renderHeadings()}
                {renderEvents()}
            </CalendarWrapper>
        </div>
    )
}

export default Calendar
