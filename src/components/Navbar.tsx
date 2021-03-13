import React from 'react';
import {
    Button,
    NavbarBrand,
    Nav,
    Navbar,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

const logo = require("../assets/images/logo.svg");

interface Props {
    account: any;
};

function GlobalNavbar(props: Props) {
    const { account } = props
    
    return (
        <Navbar style={styles.navbar}>
            <NavbarBrand href="/">
                <Nav style={styles.vCenter}>
                    <NavItem>
                        <img src={logo} style={styles.logo} />
                    </NavItem>
                    <NavItem style={styles.title}>Hackathon Global Inc.™</NavItem>
                </Nav>
            </NavbarBrand>
            {
                account ?
                <Nav style={styles.vCenter}>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                My profile
                            </DropdownItem>
                            <DropdownItem>
                                Edit profile
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/accounts/sign_out" style={styles.noStyle} data-method="delete" rel="nofollow">
                                    Log out
                                </NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                :
                <Nav style={styles.vCenter}>
                    <NavLink>
                        <Button color="link">Log in</Button>
                    </NavLink>
                    <NavLink>
                        <Button color="primary">Sign up</Button>
                    </NavLink>
                </Nav>
            }
        </Navbar>
    )
}

const styles = {
    logo: {
        height: 24,
        width: 24,
    },
    vCenter: {
        display: "flex",
        alignItems: "center",
    },
    title: {
        color: "black",
        marginLeft: 10,
        marginRight: 30,
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: '50%',
    },
    withDivider: {
        borderRight: '1px solid #D9DBDB',
        paddingRight: 20,
    },
    navbar: {
        marginLeft: 30,
        marginRight: 30,
    },
    noStyle: {
        color: "black",
        textDecoration: "none",
        padding: 0,
    }
};

export default GlobalNavbar;