<template>
  <div id="app">
      <h2>calendar</h2>
      <WeeklyCalendar ref="calendar"></WeeklyCalendar>
      <br>
      <br>
      <h2>calendarPicker</h2>
      <WeeklyCalendar calendar-picker @check="check" :styles="style"></WeeklyCalendar>

      selected:{{selected}}
  </div>
</template>

<script>
    import WeeklyCalendar from './components/VueWeeklyCalendar'

    export default {

        data() {
            return {
                selected: [],
                style: {
                    '--activeColor': "blue"
                }
            }
        },
        components: {
            WeeklyCalendar
        },

        mounted() {
            const w = this.$refs.calendar.getWeekly()
            console.log(w)
            w[0][0].active = true
        },

        methods: {
            check(value, selected) {
                console.log(value)
                this.selected = selected.slice()
            }
        }
    }

</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 15px;
    max-width: 600px;
    margin: auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
