<template>
    <div class="">
        <div id="addCity" class="flex-column">
            <div class="add--city--container">
                <form @submit="onAddingSubmission" class="add--city--inner flex-column">
                    <label for="city">Enter location:</label>
                    <input :class="{'errorClass': submitted && !city}" type="text" name="city-name" id="city" placeholder="Search by city name" v-model="city" />
                    <input type="submit" name="submit-adding-city" value="Add" />
                </form>
            </div>
            
        </div>
        <div class="backdrop" @click="closeModal"></div>   
    </div>

</template>

<script>
import { mapActions } from "vuex";
import { addCity } from "../../../Utilites/Utilites";
export default {
    methods: {
      ...mapActions("modals", ["toggleModal"]),
      closeModal(){
        this.toggleModal({type: "addCity"});
      },
      onAddingSubmission(e){
          e.preventDefault();
          this.submitted = true;
          if(this.city){
               addCity(this.city).then(() => {
                   this.closeModal();
               });            
            console.log("submitted");
          }
         
      }
    },
    data () {
        return{
            city: "",
            submitted: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .backdrop{
      z-index: 101;
    }
    #addCity{
        z-index: 130;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        justify-content: center;
        align-content: center;
        padding:0;
        margin:0;
        width: 80%;
        max-width: 500px;
        .add--city--container{
            background-color: var(--secondary-clr);
            padding: 20px;
            width: 100%;
            border-radius:8px;
            box-shadow: var(--slight-shadow);
            margin: 0 auto;
            .add--city--inner{
                color: var(--white);
                label{
                    color: inherit;
                    text-transform: capitalize;
                }
                input[type="text"]{
                    color: inherit;
                    border:none;
                    background-color: transparent;
                    border-bottom: 1px solid;
                    border-bottom-color: rgb(151, 151, 151);
                    padding: 6px 4px;
                    margin: 10px 0 20px;
                    width: 100%;
                    transition: border-bottom-color 0.4s ease-in;
                    &:focus {
                        outline: none;
                        border-bottom-color: var(--white);
                    }
                }
                input[type="submit"]{
                     color: inherit;
                     background-color: var(--dark);
                     padding: 6px 20px;
                     border-radius: 8px;
                     border: none;
                     box-shadow:var(--slight-shadow);
                     max-width: 130px;
                }
            }
        }
    }
</style>