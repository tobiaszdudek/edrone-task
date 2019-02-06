<template>
    <div class="content column col-9 col-md-12" v-if="meals.length && loaded === true">
        <div class="meals columns">
            <template v-for="(meal, index) in meals" :index="index">
                <transition name="fade" mode="out-in" appear>
                	<SingleMeal 
                		:meal="meal"
                		:key="meal.idMeal" 
                		:isInFavourites="isInFavourites(meal.idMeal)"
                		:selected="selectedMealDetails.idMeal"
                		@click.native="getDetails(meal.idMeal), activeIndex=index"
                	/>
                </transition>

                <transition name="fade-details" appear>
		        	<MealDetails 
		        		v-if="((index+1) % columns === 0 || (index+1 === meals.length)) && 
		        			Math.ceil((index+1)/columns) === Math.ceil((activeIndex+1)/columns) && 
		        			isSelected" 
		        		:selected="selectedMealDetails"
		        	/>                	
		        </transition>              
            </template>
        </div>
    </div>

    <div v-else-if="!meals.length && loaded === true" class="columns col-9 col-md-12">
        <div class="error text-center"><h3>Sorry, no meals that meet your criteria</h3></div>
    </div>    
</template>

<script>
	import axios from "axios";
	import SingleMeal from "./SingleMeal";
	import MealDetails from "./MealDetails";

	export default {
	 	name: "Meals",
	 	data(){
	 		return {
	 			fullDetailsEndpoint: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=",
	 			selectedMealDetails: {},
	 			windowWidth: 0,
	 			columns: 0,
	 			activeIndex: 0
	 		}
	 	},
		props: {
	   		meals: Array,
	   		favourites: Array,
	   		loaded: Boolean
	  	},
	  	computed: {
	  		isSelected(){
	  			//check if any meal has been selected
	  			return Object.keys(this.selectedMealDetails).length ? true : false;
	  		}
	  	},
		methods: {
			getDetails(id){

				if(id === this.selectedMealDetails.idMeal){
					//if clicked already selected reset object selectedMealDetails
					this.clearSelectedMeal();
				}else{
					//get details selected meal
	                axios.get(this.fullDetailsEndpoint + id)
	                    .then(res => {
	                        if (res.data.meals[0] == null){
	                            console.log('brak danych');
	                        }else{
	                            this.selectedMealDetails = res.data.meals[0];
	                    }
	                }); 					
				}
			},
            isInFavourites(id) {
                return (_.findIndex(this.favourites, ["id", id])) === -1 ? false : true;
            },  			
			clearSelectedMeal(){
				this.selectedMealDetails = {}
			},
            handleResize() {
                this.windowWidth = window.innerWidth;
                    if(this.windowWidth < 960 && this.windowWidth > 600){
                    this.columns = 2;
                }else if(this.windowWidth < 600){
                    this.columns = 1;
                }else{
                    this.columns = 3;
                }
            }	
		},
        created(){
	        window.addEventListener("resize", this.handleResize);
	        this.handleResize();               	

	        this.$events.$on("querySearch", this.clearSelectedMeal); 
	        this.$events.$on("dataInit", this.clearSelectedMeal);   
        },
        destroyed(){
           	window.removeEventListener("resize", this.handleResize);

           	this.$events.$off("querySearch", this.clearSelectedMeal); 
           	this.$events.$off("dataInit", this.clearSelectedMeal);   
        },  		
		components: {
			SingleMeal,
			MealDetails
		}
	}
</script>

<style lang="scss" scoped>
	.meals{
		padding: .5rem;
	}
	.error {
	    width: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
</style>