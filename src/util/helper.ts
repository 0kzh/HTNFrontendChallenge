import React, { useEffect, useState } from "react";
import moment from 'moment'
import { TEvent, TEventCategory } from './types'
import { eventDates } from './constants'

import Heap from 'heap'

export const range= (begin: number, end: number): Array<number> => {
    let len = end - begin + 1;
    let arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(begin + i);
        arr.push(begin + i + 0.5); // half hour
    }
    return arr;
}

export const convert24HTo12H = (timeIn24H: number): string => {
    const isPM = timeIn24H >= 12 && timeIn24H < 24
    let hour = Math.floor(timeIn24H % 12)
    const isHalfHour = timeIn24H % 1 === 0.5

    if (hour === 0) {
        hour = 12
    }

    return `${hour}:${isHalfHour ? "30" : "00"} ${isPM ? "PM" : "AM"}`
}

/*
 * Given 48 columns, converts hour/minute to a column number
 * 12 AM => column 1
 * 12:30 AM => column 2
 * ...
 * 11 PM => column 47
 * 1:30 PM => column 48
 */ 
export const timestampToCol = (timeInMillis: number): number => {
    const date: moment.Moment = moment(timeInMillis)
    return date.hour() * 2 + (date.minute() == 30 ? 1 : 0) + 1
}

export const formatTimestamp = (timeInMillis: number): string => {
    const date: moment.Moment = moment(timeInMillis)
    return date.format("h:mm A")
}

export const getDate = (timeInMillis: number): string => {
    const date: moment.Moment = moment(timeInMillis)
    return date.format("dddd, MMM DD")
}

export const sameDate = (moment1: moment.Moment, moment2: moment.Moment): boolean => {
    return moment1.startOf('day').isSame(moment2.startOf('day'))
}

export const hasPrevDay = (eventCategory: TEventCategory, day: moment.Moment): boolean => {
    const dates = eventDates[eventCategory]
    const firstDay: moment.Moment = moment(dates.start_time).startOf('day')
    return !firstDay.isSame(day.startOf('day'))
}

export const hasNextDay = (eventCategory: TEventCategory, day: moment.Moment): boolean => {
    const dates = eventDates[eventCategory]
    const lastDay: moment.Moment = moment(dates.end_time).startOf('day')
    return !lastDay.isSame(day.startOf('day'))
}

/*
 * LOGIN FUNCTIONALITY
 */
export const doLogin = () => {
    localStorage.setItem('logged_in', "thank mr goose")
}

export const doLogout = () => {
    localStorage.removeItem('logged_in')
}

export const isLoggedIn = (): boolean => {
    const fetchedData: string | null = localStorage.getItem('logged_in')
    return !!fetchedData
}

/*
 * ROUTING
 */
export const getEventIdFromUrl = (): string | null => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventId = urlParams.get('event')
    return eventId
}

/*
 * MISCELLANEOUS
 */
// from https://stackoverflow.com/a/64218472/5538168
export const useCheckMobileScreen = (): boolean => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 768);
}

// from https://stackoverflow.com/a/10834843/5538168
export const isNormalInteger = (str: string): boolean => {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

export const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str)
}

/*
 * Some events might overlap. 
 * This modifies `events` to add a `row` attribute so that
   overlapping events are displayed on separate lines
 */
export const processOverlaps = (events: TEvent[]): TEvent[] => {
    let heap = new Heap<number>()
    let newEvents: Array<TEvent> = []

    events.sort((a: TEvent, b: TEvent) => a.start_time - b.start_time)

    const add = (event: TEvent) => {
        event.row = heap.size() + 1
        newEvents.push(event)
        heap.push(event.end_time)
    }

    events.forEach(event => {
        if (heap.size() == 0) {
            add(event)            
            return
        }

        if (event.start_time < heap.peek()) {
            add(event)            
        } else{
            // pop all events with an earlier end date
            while (heap.size() > 0 && heap.top() < event.start_time) {
                heap.pop()
            }
            add(event)
        }
    })

    return newEvents
}