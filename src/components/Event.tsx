import React from 'react'
import styled from 'styled-components'
import { formatTimestamp } from '../util/helper'
import { eventColors } from '../util/constants'
import { TEvent } from '../util/types'

interface EventProps {
    row: number;
    column: number;
    span: number;
    event: TEvent;
    children?: React.ReactNode
}

const Event: React.FC<EventProps> = (props) => {
    const { event } = props

    return (
        <Wrapper {...props}>
            <EventName>{event.name}</EventName>
            <EventDate>{`${formatTimestamp(event.start_time)} - ${formatTimestamp(event.end_time)}`}</EventDate>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: white;
    padding: 5px 8px;
    margin: 0 3px;
    background: ${(p: EventProps) => eventColors[p.event.event_type]};
    border-radius: 5px;
    grid-row: ${(p: EventProps) => p.row};
    grid-column: ${(p: EventProps) => p.column} / span ${(p : EventProps) => p.span}
`

const EventName = styled.div`
    font-size: 12px;
    margin-bottom: 3px;
`

const EventDate = styled.div`
    font-size: 10px;
    opacity: 0.7;
`

export default Event
