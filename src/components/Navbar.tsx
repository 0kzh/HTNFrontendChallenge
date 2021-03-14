import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { FlexRow } from './common/FlexLayout'
import Button from './common/Button'

import logo from '../assets/images/logo.svg'
import { doLogin, doLogout, isLoggedIn } from '../util/helper'


const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    // check if logged in
    useEffect(() => {
        setLoggedIn(isLoggedIn())
    }, [])

    const logIn = () => {
        doLogin()
        window.location.reload()
    }

    const logOut = () => {
        doLogout() 
        window.location.reload()
    }

    return (
        <FlexRow {...props}>
            <a href="/"><Logo src={logo} /></a>
            <Button
                text={loggedIn ? "Log out" : "Log in"}
                onClick={loggedIn ? logOut : logIn}
            />
        </FlexRow>
    )
}

const Logo = styled.img`
    height: 30px;
    width: 30px;
`

export default Navbar