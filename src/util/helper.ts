import moment from 'moment'

export const range= (begin: number, end: number): Array<number> => {
    let len = end - begin + 1;
    let arr = new Array(len);
    for (var i = 0; i < len; i++) {
        arr[i] = begin + i;
    }
    return arr;
}

export const convert24HTo12H = (timeIn24H: number): string => {
    const isPM = timeIn24H >= 12 && timeIn24H < 24
    let hour = timeIn24H % 12
    if (hour === 0) {
        hour = 12
    }

    return `${hour} ${isPM ? "PM" : "AM"}`
}

/*
 * Given 24 columns, converts hour/minute to a column number
 * 12 AM => column 1
 * 11 PM => column 24
 */ 
export const timestampToCol = (timeInMillis: number): number => {
    const date: moment.Moment = moment(timeInMillis)
    return date.hour() + 1
}

export const sameDate = (moment1: moment.Moment, moment2: moment.Moment): boolean => {
    console.log("day1" + moment1.startOf('day').format("LLLL"))
    console.log(moment2.startOf('day').format("LLLL"))
    console.log(moment1.startOf('day').isSame(moment2.startOf('day')))
    return moment1.startOf('day').isSame(moment2.startOf('day'))
}