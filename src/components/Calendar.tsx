import React, { useState } from 'react'
import styled from 'styled-components'
import { range, convert24HTo12H, timestampToCol, sameDate } from '../util/helper'
import eventData from "../assets/data.json"
import { TEvent } from '../util/types'
import Event from './Event'

const moment = require('moment')

interface Props {}
const startHour = 0
const endHour = 23

const hours = range(startHour, endHour)

const events: TEvent[] = eventData["data"]["events"] as TEvent[]

const Calendar: React.FC = (props: Props) => {
    const {} = props

    const [curDay, setCurDay] = useState(moment(1610438400000))

    const renderDividers = () => 
        hours.map((hour, i) => 
            <Divider column={i + 1}/>
        )

    const renderHeadings = () => 
        hours.map((hour, i) => 
            <Heading column={i + 1}>
                <div style={{ transform: 'translate(-25%, 0)'}}>{
                    hour === 0 ? '' : convert24HTo12H(hour)
                }</div>
            </Heading>
        )

    const renderEvents = () => 
        events.filter((e: TEvent) => sameDate(curDay, moment(e.start_time))).map((event: TEvent, i) =>
            <Event 
                column={timestampToCol(event.start_time)}
                span={timestampToCol(event.end_time) - timestampToCol(event.start_time)}
                row={event.row + 1}
                event={event}
            />
        )

    return (
        <div style={{ overflow: 'scroll', flex: 1 }}>
            <CalendarWrapper>
                {renderDividers()}
                {renderHeadings()}
                {renderEvents()}
            </CalendarWrapper>
        </div>
    )
}

const CalendarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${(endHour - startHour + 1) * 2}, 120px);
    grid-row-gap: 1em;
    width: max-content;
    overflow-y: hidden;
    height: 100%;
    margin: auto;
`

const Divider = styled.span`
    border-left: 1px solid #F2F2F7;
    grid-row: 2 / span 100;
    grid-column: ${(props: { column: number} ) => props.column};
`

const Heading = styled.span`
    font-size: 12px;
    color: #ADAEB2;
    grid-column: ${(props: { column: number} ) => props.column};
    grid-row: 1;
`

export default Calendar
