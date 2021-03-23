import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { TEvent } from '../../util/types'
import { formatTimestamp, getDate, copyToClipboard, isLoggedIn, openInNewTab, generateEventLink } from '../../util/helper'
import { CalendarOutline, ClockOutline, X } from 'heroicons-react'
import { FlexRow } from '../common/FlexLayout'
import Button from '../common/Button'
import DynamicFlexLayout from '../common/DynamicFlexLayout'

interface Props {
    allEvents: TEvent[]
    eventData: TEvent | undefined
    closeModalHandler: () => void
}

const EventModal: React.FC<Props> = (props) => {
    const { allEvents, eventData, closeModalHandler } = props

    const copyEventLink = (event: TEvent) => {
        copyToClipboard(generateEventLink(event.id))
        setTimeout(() =>
            alert("Copied to clipboard")
        , 100)
    }

    const renderEventLink = (): React.ReactNode => {
        if (!eventData) return

        if (isLoggedIn()) {
            return <Button text="Go to Event" onClick={() => openInNewTab(eventData.private_url)}/> 
        } else if (eventData.public_url) {
            return <Button text="Go to Event" onClick={() => openInNewTab(eventData.public_url!)}/> 
        }
    }

    const renderSpeakers = (): React.ReactNode => {
        if (!eventData) return

        if (eventData.speakers && eventData.speakers.length > 0) {
            return (
                <div>
                    <Subheading>Speakers</Subheading>
                    <FlexRow style={{ gap: 5 }}>
                        {eventData.speakers.map((speaker, i) => {
                            if (speaker.profile_pic) {
                                return (
                                    <div>
                                        <SpeakerImage key={speaker.name} src={speaker.profile_pic} data-tip data-for={`speaker_${i}`} />
                                        <ReactTooltip id={`speaker_${i}`} effect={"solid"}>
                                            {speaker.name}
                                        </ReactTooltip>
                                    </div>
                                )
                            } else if (speaker.name) {
                                return (
                                    <div>
                                        <SpeakerImage key={speaker.name} src={`https://ui-avatars.com/api/?length=1&name=${speaker.name}`} data-tip data-for={`speaker_${i}`} />
                                        <ReactTooltip id={`speaker_${i}`} effect={"solid"}>
                                            {speaker.name}
                                        </ReactTooltip>
                                    </div>
                                )
                            }
                        })}
                    </FlexRow>
                </div>
            )
        }
    }

    const renderRelatedEvents = (): React.ReactNode => {
        if (!eventData) return

        if (eventData.related_events && eventData.related_events.length > 0) {
            return (
                <div>
                    <Subheading>Related Events</Subheading>
                    <FlexRow style={{ gap: 10}}>
                        {
                            eventData.related_events
                            .filter((eid: number) => {
                                const event = allEvents.find((event: TEvent) => event.id == eid)
                                return event && (event.permission === "public" || isLoggedIn())
                            })
                            .map(targetEventId => {
                                const event = allEvents.find((event: TEvent) => event.id == targetEventId)
                                if (event) {
                                    return <Event href={generateEventLink(event.id)}>{event.name}</Event>
                                }
                            })
                        }
                    </FlexRow>
                </div>
            )
        }
    }

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

                    {renderSpeakers()}
                    {renderRelatedEvents()}
                </Description>
                <FlexRow style={{ justifyContent: 'space-between' }}>
                    <DynamicFlexLayout style={{ gap: 5 }}>
                        {renderEventLink()}
                        <Button text="Add to Calendar" onClick={() => alert("This doesn't actually do anything 💩")}/>
                    </DynamicFlexLayout>
                    <Button text="Copy Event Link" onClick={() => copyEventLink(eventData)}/>
                </FlexRow>
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

const Subheading = styled.div`
    text-transform: uppercase;
    font-size: 12px;
    color: #8E8E93;
    margin-top: 2em;
    margin-bottom: 0.5em;
`

const SpeakerImage = styled.img`
    height: 32px;
    width: 32px;
    border-radius: 50%;
`

const Event = styled.a`
    font-size: 12px;
    color: #8E8E93;

    &:visited, &:active {
        color: #8E8E93;
    }
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
