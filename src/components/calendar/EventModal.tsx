import React from 'react'
import styled from 'styled-components'
import { TEvent } from '../../util/types'
import { formatTimestamp, getDate } from '../../util/helper'
import { CalendarOutline, ClockOutline, X } from 'heroicons-react'
import { FlexRow } from '../common/FlexLayout'
import Button from '../common/Button'

interface Props {
    eventData: TEvent | undefined
    closeModalHandler: () => void
}

const EventModal: React.FC<Props> = (props) => {
    const { eventData, closeModalHandler } = props

    return (
        eventData ?
        <div>
            <ModalBG onClick={closeModalHandler} />
            <Modal>
                <FlexRow style={{ justifyContent: 'space-between' }}>
                    <Title>{eventData.name}</Title>
                    <X style={XButtonStyle} onClick={closeModalHandler} />
                </FlexRow>
                <FlexRow>
                    <CalendarOutline style={ModalIconStyle} />
                    <Date style={{marginRight: '2em'}}>{`${getDate(eventData.start_time)}`}</Date>
                    <ClockOutline style={ModalIconStyle} />
                    <Date>{`${formatTimestamp(eventData.start_time)} - ${formatTimestamp(eventData.end_time)}`}</Date>
                </FlexRow> 
                <Description>
                    {eventData.description}
                </Description>
                <Button text="Add to Calendar" onClick={() => alert("This doesn't actually do anything 💩")}/>
            </Modal>
        </div>
        : null
    )
}

const Modal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    max-width: 780px;
    width: calc(100% - 50px);
    outline: none;
    padding: 20px;
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --ring-shadow: 0 0 #0000;
    box-shadow: var(--ring-shadow, 0 0 #0000), var(--ring-shadow, 0 0 #0000), var(--shadow);
    border-radius: 0.5rem;
    margin: auto;
    font-size: 14px;
    line-height: 1.5;
`

const ModalBG = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const Title = styled.h1`
    color: #111827;
    font-size: 28px; 
    font-weight: 600;
`

const Description = styled.p`
    color: #636366;
    margin-bottom: 2em;
`

const Date = styled.div`
    font-size: 12px;
    color: #8E8E93;
`

const XButtonStyle = {
    color: '#ADAEB2',
    cursor: 'pointer'
}

const ModalIconStyle = {
    height: 16,
    width: 16,
    color: '#ADAEB2',
    marginRight: 5
}

export default EventModal
