<template>
        <Modal>
            <div slot="modal_body" class="add--city--container">
                    <form @submit="onAddingSubmission" class="add--city--inner flex-column">
                        <label for="city">Enter location:</label>
                        <input :class="{'errorClass': submitted && !city}" type="text" name="city-name" id="city" placeholder="Search by city name (e.g. Madrid, Spain)" v-model="city" />
                        <input :disabled=" getKeys && getKeys.isAddingCity " class="primary-btn-lg" :class="{'disabled': getKeys && getKeys.isAddingCity }" type="submit" name="submit-adding-city" value="Add" />
                    </form>
            </div> 
        </Modal>
</template>

<script>
import Modal from "../Modal.vue";
import { mapActions, mapGetters } from "vuex";
import { addCity } from "@/Utilities/Utilites";
export default {
    computed: {
         ...mapGetters("toggleKeys", ["getKeys"]),
    },
    components: {
        Modal
    },
    methods: {
      ...mapActions("modals", ["toggleModal"]),
      onAddingSubmission(e){
          e.preventDefault();
          this.submitted = true;
          if(this.city && !this.getKeys?.isAddingCity){
               addCity(this.city).then(() => {
                   this.toggleModal({ type: "addCity"});
               });
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
            }
        }
</style>