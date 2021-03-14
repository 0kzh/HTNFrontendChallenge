import React from 'react'
import styled from 'styled-components'

interface Props {
    color: string;
    text: string;
    isSelected: boolean;
}

function FilterButton(props: Props) {
    const { color, text, isSelected } = props

    return (
        <RoundButton isSelected={isSelected}>
            <Indicator color={color} />
            {text} 
        </RoundButton>
    )
}

const RoundButton = styled.div`
    background: ${(p: {isSelected: boolean}) => p.isSelected ? "#48484A" : "white"};
    
    &:hover{
        background: #48484A;
    }
`

const Indicator = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    color: ${(p: {color: string}) => p.color};
    margin-right: 5px;
`

export default FilterButton
