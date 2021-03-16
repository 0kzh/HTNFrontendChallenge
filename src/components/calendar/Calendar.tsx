import React, { useState, useEffect } from 'react'
import { request } from 'graphql-request'
import styled from 'styled-components'
import { range, convert24HTo12H, timestampToCol, sameDate, isLoggedIn, processOverlaps, isNormalInteger, getEventIdFromUrl } from '../../util/helper'
import { TEvent, TEventType } from '../../util/types'
import Event from './Event'
import EventModal from './EventModal'
import moment from 'moment';

import { API_ENDPOINT } from '../../util/constants'
import { getEvents } from '../../graphql/query'

interface Props {
    curDay: moment.Moment
    filter: TEventType | null
}
const startHour = 0
const endHour = 23

const hours = range(startHour, endHour)

const Calendar: React.FC<Props> = (props) => {
    const { curDay, filter } = props

    const [events, setEvents] = useState<TEvent[]>([])
    const [selectedEvent, setSelectedEvent] = useState<TEvent>()

    useEffect(() => {
        (async () => {
            const data = await request(API_ENDPOINT, getEvents)
            if (data && data.events) {
                setEvents(processOverlaps(data.events))
            }
        })()
    }, [])
    
    // determine if event was specified in url
    useEffect(() => {
        const eventId: string | null = getEventIdFromUrl()
        if (eventId && isNormalInteger(eventId)) {
            const eventData = events.filter((e: TEvent) => e.id === Number(eventId))
            if (eventData) {
                const event = eventData[0]
                setSelectedEvent(event)
            }
        }
    }, [events])

    const renderDividers = () => 
        hours.map((hour, i) => 
            <Divider key={"div_" + i} column={i + 1}/>
        )

    const renderHeadings = () => 
        hours.map((hour, i) => 
            <Heading key={"hour_" + i} column={i + 1}>
                <div style={{ transform: 'translate(-25%, 0)'}}>{
                    hour === 0 ? '' : convert24HTo12H(hour)
                }</div>
            </Heading>
        )

    const renderEvents = () => 
        events
        .filter((e: TEvent) => e.permission === "public" || isLoggedIn())
        .filter((e: TEvent) => !filter || e.event_type === filter)
        .filter((e: TEvent) => sameDate(curDay, moment(e.start_time)))
        .map((event: TEvent, i) =>
            <Event
                key={event.id}
                column={timestampToCol(event.start_time)}
                span={timestampToCol(event.end_time) - timestampToCol(event.start_time)}
                row={event.row + 1}
                event={event}
                onClick={() => setSelectedEvent(event)}
            />
        )
    
    const closeModal = () => setSelectedEvent(undefined)

    return (
        curDay ?
        <div style={{ overflow: 'scroll', flex: 1 }}>
            <CalendarWrapper>
                {renderDividers()}
                {renderHeadings()}
                {renderEvents()}
            </CalendarWrapper>
            <EventModal allEvents={events} eventData={selectedEvent} closeModalHandler={closeModal} />
        </div>
        : null
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
