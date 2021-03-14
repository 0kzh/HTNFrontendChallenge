import React from 'react'
import styled from 'styled-components'

interface Props {
    text: string
}

const Button: React.FC<Props> = (props) => {
    const {
        text
    } = props

    return (
        <ButtonWrapper>
            {text}
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.button`
    color: #24292e;
    cursor: pointer;
    background-color: #fafbfc;
    box-shadow: 0 1px 0 rgb(27 31 35 / 4%), inset 0 1px 0 rgb(255 255 255 / 25%);
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    border: 1px solid rgba(27,31,35,0.15);
    border-radius: 6px;
    outline: none;
    padding: 6px 12px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #fafbfc;
    appearance: none;
    &:hover {
        background-color: #f3f4f6;
        transition-duration: 0.1s;
    }
`

export default Button