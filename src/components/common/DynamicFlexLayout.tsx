import React from 'react'
import { FlexRow, FlexColumn } from './FlexLayout'
import { useCheckMobileScreen } from '../../util/helper'

interface Props {}

/*
 * Dynamically detects if the user is on desktop or mobile
 * - if on mobile => uses FlexColumn
 * - if on desktop => uses FlexRow
 */
const DynamicFlexLayout: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        useCheckMobileScreen() ?
        <FlexColumn {...props}>{props.children}</FlexColumn>        
        :
        <FlexRow {...props}>{props.children}</FlexRow>        
    )
}

export default DynamicFlexLayout
