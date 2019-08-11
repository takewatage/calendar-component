import linq from 'linq'
import moment from "moment"


export default class CalendarService {
    constructor(data) {

        this.active = false
        this.year =''
        this.day = ''
        this.month = ''
        this.dayOfWeek = ''
        this.monthDay = [],
        this.weeklyArray = []


        this.data = data
        this.date = ''
        this.create()
    }



    create() {
        if(!this.data) return
        const ob = moment(this.data).locale('ja')
        this.year = ob.get('year')
        this.day = ob.get('date')
        this.month = ob.format('MMM')
        this.dayOfWeek = ob.format('dd')
        this.date = ob.format('YYYY-MM-DD')

    }

    get today() {
        return moment(this.data).locale('ja').format('YYYY年 MM月')
    }

    getDailyArray() {

        // 今月を取得
         const start = moment(this.data).startOf('month');
        // 来月を取得
         const end = moment(this.data).endOf('month');

        // 間隔を１日ずつインクリメントして配列へpush
        while (start.unix() <= end.unix()) {
            this.monthDay.push(start.format('YYYY-MM-DD'));
            start.add(1, 'days');
        }
    }

    getWeeklyMoment(week) {

        const startDate = moment(this.data).startOf('day')

        //週を日にちに変換
        const showDays = week * 7

        const dates = linq.from([...Array(showDays).keys()]).select(x => {
            const item = startDate.clone().add(x, 'days')
            return new CalendarService(item)

        }).toArray()

        this.weeklyArrayConvert(dates)
        return this.weeklyArray
    }

    weeklyArrayConvert(array) {
        let tmp = []
        let count = 0

        linq.from(array).forEach((x,i=1) => {
            count++
            tmp.push(x)
            if(count === 7) {
                this.weeklyArray.push(tmp)
                tmp = []
                count = 0
            }
        })
    }



}