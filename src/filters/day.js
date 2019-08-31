import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const day = {};

function convertToDay(date) {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
}

day.install = (Vue) => Vue.filter("day", val => convertToDay(val));

export default day;