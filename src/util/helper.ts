import moment from 'moment'

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

export const sameDate = (moment1: moment.Moment, moment2: moment.Moment): boolean => {
    return moment1.startOf('day').isSame(moment2.startOf('day'))
}