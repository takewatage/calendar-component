
## npm-package-base

### Installation

With npm:

    npm install @team-decorate/vue-weekly-calendar
    
    
### Usage
calendar

```html
<WeeklyCalendar ref="calendar"></WeeklyCalendar>

<script>
    import WeeklyCalendar from '@team-decorate/vue-calendar'

    export default {

        mounted() {
            const w = this.$refs.calendar.getWeekly()
            console.log(w)
            w[0][0].active = true
        },
        
        components: {
            WeeklyCalendar
        },
    }

</script>

```

calendar picker

```html
<WeeklyCalendar 
    calendar-picker 
    @check="check" 
    :styles="style">
</WeeklyCalendar>

<script>
    import WeeklyCalendar from '@team-decorate/vue-calendar'

    export default {

        data() {
            return {
                selected: [],
                style: {
                    '--activeColor': "blue"
                }
            }
        },

        methods: {
            check(value, selected) {
                console.log(value)
                this.selected = selected.slice()
            }
        },
        
        components: {
            WeeklyCalendar
        },
    }

</script>

```
    
### props
    
|name|default|type|required|description|
|:---|:---|:---|:---|:---|
|calendar-picker |false|Boolean|---|カレンダー表示切り替え|
|styles|---|Object|---|css object|


### styles
|name|default|description|
|:---|:---|:---|
|--activeColor|'red'|checkした時のbackground-color|
|--activeTextColor|'#fff'|checkした時のcolor|
|--textColor|'#000'|default color|
