<template>
    <div class="v-w-calendar" :style="setStyle">
        <div class="v-w-calendar__wrapper">

            <div class="title__wrapper" v-show="!calendarPicker">
                <button class="pre btn"
                        @click="pre"
                        :disabled="showWeekNumber===0"><  前の週</button>

                <p class="current-week">{{currentMonth}}</p>

                <button class="next btn"
                        @click="next"
                        :disabled="showWeekNumber===(showWeek-1)">次の週  ></button>
            </div>

            <div class="week__wrapper" v-if="!calendarPicker">
                <div class="week-day" v-for="item in showCalendar">
                    <p class="text">{{item.dayOfWeek}}</p>
                    <p class="num">{{item.day}}</p>
                    <div v-if="!item.active" class="mark">ー</div>
                    <div v-else class="mark active"></div>
                </div>
            </div>

            <div v-else class="week__wrapper picker">
                <p class="current-week">{{calendar.today}}</p>
                <div class="week-day d-flex justify-content-between w-100">
                    <p class="week-day__text" v-for="item in showCalendar">{{item.dayOfWeek}}</p>
                </div>
                <div class="input__wrapper" v-for="weeks in weekly">
                    <div class="dayBox" v-for="item in weeks">
                        <input type="checkbox"
                               @change="check(item)"
                               class="d-none"
                               :id="item.date"
                               :value="item.date"
                               v-model="select">

                        <label :for="item.date"
                               class="day"
                               :class="{'active': item.active}">{{item.day}}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CalendarService from '../Service/CalendarService'

    export default {
        name: 'weekly-calendar',

        data() {
            return {
                calendar: new CalendarService(),
                weekly: [],
                showWeekNumber: 0,
                select: []
            }
        },

        created() {
            this.weekly = this.calendar.getWeeklyMoment(this.showWeek)
        },

        computed: {
            showCalendar() {
                return this.weekly[this.showWeekNumber]
            },
            currentMonth() {
                return this.showCalendar[0].today
            },
            setStyle() {
                if(this.styles)
                    return this.styles
            }
        },

        props: {
            //表示する週
            showWeek: {
                type: Number,
                default: 2
            },
            calendarPicker: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object
            }
        },

        methods: {
            next() {
                this.showWeekNumber++
            },
            pre() {
                this.showWeekNumber--
            },
            getWeekly() {
                return this.weekly
            },
            check(value) {
                value.active = !value.active
                this.$emit('check', value, this.select)
            }

        }
    }
</script>

<style lang="scss">

    .v-w-calendar {
        --activeColor: red;
        --textColor: #000;
        --activeTextColor: #fff;


        &__wrapper {
            .title__wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .btn{
                    outline: 0;
                    box-shadow: none;
                }

                //前の週
                .pre {
                }

                .current-week {
                    margin-bottom: 0;
                }

                //次の週
                .next {
                }

            }
            //カレンダー部分
            .week__wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 0;
                padding-right: 0;
                margin-top: 24px;
                margin-bottom: 24px;

                .week-day {
                    .mark {
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        color: #a7a39a;
                        background-color: unset;
                    }
                    .mark.active {
                        border: 2px solid var(--activeColor);
                        border-radius: 50%;
                    }
                }
            }

            //カレンダーピッカー
            .week__wrapper.picker {
                flex-direction: column;

                .d-none {
                    display: none;
                }

                .mark {
                    display: none;
                }
                .week-day__text {
                    display: inline-block;
                    width: 14.28571%;
                    line-height: 36px;
                    text-align: center;
                    font-size: 15px;
                    font-weight: 300;
                    cursor: pointer;
                    margin-bottom: 0;
                }


                .input__wrapper {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

                    .dayBox {
                        display: flex;
                        width: 14.28571%;
                        height: 36px;
                        justify-content: center;
                        cursor: pointer;
                        align-items: center;
                        .day {
                            color: var(--textColor);
                            font-size: 14px;
                            margin-bottom: 0;
                            text-align: center;
                            border-radius: 100%;
                            width: 30px;
                            height: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                        }
                        .day.active {
                            color: var(--activeTextColor);
                            background: var(--activeColor);
                        }
                    }

                }
            }
        }
    }

</style>