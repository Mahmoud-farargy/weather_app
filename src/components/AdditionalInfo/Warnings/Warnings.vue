<template>
        <div id="warnings">
            <div class="container flex-column">
                <!-- Section title -->
                <h3 class="forecast--title" :style="{color: isDay ? '#fff' :'#acfcff'}">Warnings</h3>
                <ul class="alerts--list">
                    <li v-for="(alert, index) in  alerts" :key="index" >
                        <AlertItem :alert="alert" />
                    </li>
                </ul>
            </div>   
        </div>

</template>

<script>
import AlertItem from "./AlertItem/AlertItem";

export default {
    props: {
        alerts : Array,
        isDay: Boolean
    },
    components: {
        AlertItem
    }
}
</script>

<style lang="scss" scoped>
#warnings{
    .container{
        padding-left:0;
        padding-right: 0;
    }
    .alerts--list{
        margin-top: 10px;
        list-style: none;
        padding: 0;
        li{
            margin-bottom: 15px;
            &:last-of-type{
                margin-bottom: 0;
            }
        }
    }
}

</style>