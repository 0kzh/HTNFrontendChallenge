import React from 'react'
import styled from 'styled-components'

interface Props {
    isSelected: boolean;
}

const EventSelectorButton: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children } = props

    return (
        <RoundButton {...props}>
            {children}
        </RoundButton>
    )
}

const RoundButton = styled.div`
    font-size: 12px;
    background: ${(p: {isSelected: boolean}) => p.isSelected ? "#CEEEFC" : "white"};
    border: 1px solid #eef2f2;
    border-radius: 50px;
    padding: 5px 10px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    
    &:hover{
        background: #CEEEFC;
    }
`


export default EventSelectorButton
