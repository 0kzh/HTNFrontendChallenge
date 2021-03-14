import React from 'react'
import styled from 'styled-components'

interface Props {
    color: string;
    text: string;
    isSelected: boolean;
}

const FilterButton: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const { color, text, isSelected, onClick } = props

    return (
        <RoundButton {...props}>
            <Indicator color={color} />
            {text} 
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
    margin-top: 3px;
    margin-bottom: 3px;
    
    &:hover{
        background: #CEEEFC;
    }
`

const Indicator = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${(p: {color: string}) => p.color};
    margin-right: 6px;
    margin-top: 1px;
`

export default FilterButton
