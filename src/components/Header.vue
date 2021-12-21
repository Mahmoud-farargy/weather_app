<template>
<div>
    <div v-if="currentRouteName && currentRouteName.toLowerCase() === 'home'">
        <!-- Search bar -->
        <div v-if="getKeys.isSearchBarOpen" id="searchBar" >
            <div class="flex-row container search--box">
                <div class="search--bar--inner flex-row">
                  <i class="fas fa-search search--icon"></i>
                  <input autofocus type="text" placeholder="Search for a city that has been added" @input="onSearchTyping"  />  
                </div>
            </div>
             <i @click="openSearchBar(false)" class="fas fa-times close--search--icon highlight--on--active"></i>
        </div>
        <!-- Home header -->
        <header v-else id="mainHeader" >
            <nav class="flex-row container">
                <router-link class="logo-anchor" :to="{name: 'Home'}">
                    <span class="logo">
                        {{logoText}}
                    </span>
                </router-link>
                <ul class="header--actions flex-row">
                    <li v-if="getResultList.length > 0" title="Search for an added city" @click="openSearchBar(true)" :class="{'del--active' : getKeys.isSearchBarOpen}" class="highlight--on--active"><i class="fas fa-search"></i></li>
                    <li v-if="getResultList.length > 0" title="Delete a city" @click="delItems" :class="{'del--active' : getKeys && getKeys.editCities}" class="highlight--on--active"><i class="far fa-edit"></i></li>
                    <li v-if="getResultList.length > 0" title="Refresh" @click="refreshApp" class="highlight--on--active"><i class="fas fa-sync"></i></li>  
                    <li title="Add a city" @click="toggleModal('addCity')" class="highlight--on--active"><i class="fas fa-plus"></i></li>
                </ul>
            </nav>
        </header>  
    </div>

  
    <!-- Weather header -->
    <header v-if="currentRouteName && currentRouteName.toLowerCase() === 'weather'" id="mainHeader" v-bind:class="{'night--weather': !getKeys.isDayWeather,
    'day--weather': getKeys.isDayWeather }">
     
         <nav class="flex-row container ">
            <button title="Go back" class="nativate--back--btn highlight--on--active" @click="goBack">
               <i class="fas fa-chevron-left"></i>
            </button>
            <span title="Today's date in that city">
                {{formattedCityDate}}
            </span>
            <span title="Change Metric" @click="toggleTemp" class="fah--cel--btn highlight--on--active">
                &deg; {{ getKeys && getKeys.isFahrenheit ? 'F' : 'C'}}
            </span>
         </nav>

    </header> 

</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { refreshCitiesResults, notify } from "../Utilities/Utilites";
import moment from "moment-timezone";
import { logoText } from "@/app-config";

export default {
    data () {
        return {
            currentRouteName: "home",
            logoText
        }
    },
    computed: {
        ...mapGetters("toggleKeys", ["getKeys"]),
        ...mapGetters("savedResults", ["getResultList", "getCityTimezone", "getResultsCopy"]),
        formattedCityDate(){
            return moment().tz(this.getCityTimezone)?.format('ddd, MMM DD');
        }
    },
    methods: {
        ...mapActions("modals", {modal:"toggleModal"}),
        ...mapActions("toggleKeys", ["mutateKeys", "resetSomeKeys"]),
        ...mapActions("savedResults", ["updateResultList"]),
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
        },
        goBack(){
            this.$router.go(-1);
        },
        openSearchBar(val){
             this.mutateKeys({key: "isSearchBarOpen", val});
             if(!val){
                  this.updateResultList(this.getResultsCopy);
             }
        },
        onSearchTyping(e){
            const enteredValue = e.target.value;
            const filteredCities = this.getResultsCopy && this.getResultsCopy.length > 0  && this.getResultsCopy?.filter(el => el.name?.toLowerCase()?.includes(enteredValue?.toLowerCase()));
            this.updateResultList(enteredValue !== "" ? filteredCities : this.getResultsCopy);
        }
    },
    watch:{
        $route(to){
            this.currentRouteName = to.name;
            const { resetSomeKeys, updateResultList, getKeys, getResultsCopy } = this;
            resetSomeKeys({keys: ["editCities", "isSearchBarOpen"]});
            
            if(getKeys?.isSearchBarOpen){
                updateResultList(getResultsCopy);
            }
        },
    },
    mounted(){
        this.currentRouteName = this.$route.name;
    }
}
</script>

<style lang="scss" scoped>
 #searchBar{
     position: fixed;
     top:0;
     left:0;
     width: 100%;
     padding:23px 10px;
     background-color: var(--primary-clr);
     z-index: var(--zIndex-seachBar);
     color: var(--white);
     .container{
         padding-top: 0;
         padding-bottom: 0;
         width:100%;
     }
     .close--search--icon{
         padding: 5px 15px;
         position: absolute;
         top:50%;
         transform: translate(-50%, -50%);
         right:20px;
         color: inherit;
         font-size: 20px;
         font-weight: 800;
         cursor: pointer;
           @media only screen and (max-width: 700px) {
                right:2%;
           }
     }
     .search--box{
        align-items: center;
        justify-content: center;
        flex-wrap: nowrap;
         @media only screen and (max-width: 700px) {
             justify-content: start;
         }
        .search--bar--inner{
            position: relative;
            border: 1px solid var(--gray);
            border-radius: 22px;
            padding: 8px 15px 8px 40px;
            width: 350px;
            overflow: hidden;
            .search--icon{
                position: absolute;
                left:21px;
                top:50%;
                transform: translate(-50%, -50%);
            }
            @media only screen and (max-width: 700px) {
                width: 85%;
                justify-self: flex-start;
            }
            input{
                width:100%;
                background-color: transparent;
                border: none;
                color: var(--white);
                font-weight: 600;
                &:focus{
                    outline: none;
                }
                &::placeholder{
                    color: rgb(155, 155, 155);
                }
            }  
        }
     }


 }
 #mainHeader{
     position: fixed;
     top:0;
     left:0;
     width: 100%;
     z-index: var(--zIndex-header);
     background-color: var(--primary-clr);
     color: var(--white);
     box-shadow: var(--slight-shadow);
     .nativate--back--btn{
         background-color: transparent;
         border: none;
         padding: 1px 15px;
     }
     .fah--cel--btn{
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        font-weight: 800;
        &:hover{
            background-color: rgba(255,255,255,0.1);
            border-radius: 5px;
        }
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
            padding-left: 0;
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