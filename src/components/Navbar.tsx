import React from 'react'
import styled from 'styled-components'

import { FlexRow } from './common/FlexLayout'
import Button from './common/Button'

import logo from '../assets/images/logo.svg'

interface Props {}

const Navbar: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const {} = props

    return (
        <FlexRow {...props}>
            <a href="#"><Logo src={logo} /></a>
            <Button text="Log in" />
        </FlexRow>
    )
}

const Logo = styled.img`
    height: 30px;
    width: 30px;
`

export default Navbar