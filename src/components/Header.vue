<template>
<div>
    
    <!-- Home header -->
    <header v-if="currentRouteName && currentRouteName.toLowerCase() === 'home'" id="mainHeader" >
        <nav class="flex-row container">
            <router-link class="logo-anchor" :to="{name: 'Home'}">
                <span class="logo">
                    Weather
                </span>
            </router-link>
            <ul class="header--actions flex-row">
                <div v-if="getResultList.length > 0" class="flex-row">
                    <li @click="delItems" :class="{'del--active' : getKeys && getKeys.editCities}" class="highlight--on--active"><i class="far fa-edit"></i></li>
                    <li @click="refreshApp" class="highlight--on--active"><i class="fas fa-sync"></i></li>  
                </div>
                <li @click="toggleModal('addCity')" class="highlight--on--active"><i class="fas fa-plus"></i></li>
            </ul>
        </nav>
    </header>
  
    <!-- Weather header -->
    <header v-if="currentRouteName && currentRouteName.toLowerCase() === 'weather'" id="mainHeader" v-bind:class="{'night--weather': !getKeys.isDayWeather,
    'day--weather': getKeys.isDayWeather }">
     
         <nav class="flex-row container ">
            <router-link :to="{name: 'Home'}">
               <i class="fas fa-chevron-left"></i>
            </router-link>
            <span>
                <!-- todo: pass city time here -->
                {{new Date().toLocaleString("en-us",{weekday: "short"})}},
                {{new Date().toLocaleString("en-us",{month: "short"})}}
                {{new Date().toLocaleString("en-us",{day: "2-digit"})}}
            </span>
            <span @click="toggleTemp" class="fah--cel--btn highlight--on--active">
                &deg; {{ getKeys && getKeys.isFahrenheit ? 'F' : 'C'}}
            </span>
         </nav>

    </header> 

</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { refreshCitiesResults, notify } from "../Utilites/Utilites";

export default {
    data () {
        return {
            currentRouteName: "home",
        }
    },
    watch:{
        $route(to){
            this.currentRouteName = to.name;
        }
    },
    computed: {
        ...mapGetters("toggleKeys", ["getKeys"]),
        ...mapGetters("savedResults", ["getResultList"])
    },
    methods: {
        ...mapActions("modals", {modal:"toggleModal"}),
        ...mapActions("toggleKeys", ["mutateKeys"]),
        toggleModal(type){
            this.modal({type});
        },
        refreshApp() {
            refreshCitiesResults().then(() => {
                notify({type: "success", msg: "Updated."});
            }).catch(() => {
                window.location.reload();
            });
        },
        delItems() {
            this.mutateKeys({key: "editCities"});
        },
        toggleTemp(){
             this.mutateKeys({key: "isFahrenheit"});
        }
    },
    created(){
        this.currentRouteName = this.$route.name;
    }
}
</script>

<style lang="scss" scoped>
 #mainHeader{
     position: fixed;
     top:0;
     left:0;
     width: 100%;
     z-index: 99;
     background-color: var(--primary-clr);
     color: var(--white);
     box-shadow: var(--slight-shadow);
     .fah--cel--btn{
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        font-weight: 800;
     }
     nav{
        width: 100%;
        max-width: 1024px;
        align-items:center;
        justify-content: space-between;
        
        span{
            font-weight: 900;
            font-size: 18px;
            color: var(--white);
            cursor: pointer;
        }
        .logo-anchor{
            text-decoration: none;
        }
        i, span{
            color: var(--white);
            a{
                color: inherit;
            }
        }
        .header--actions{
            list-style: none;
            li {
                margin-left:7px;
                padding:1px 7px;
                &:first{
                    margin-left:0px;
                 }
                i{
                   color: var(--white);
                    &:hover{
                        cursor: pointer;
                    }
                    font-size: 17px;
                    
                }
            } 
            .del--active i{
                color: rgba(210,75,75, 1);
            }
        }    
     }
 }
</style>