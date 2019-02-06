<template>
    <div id="app">

        <transition name="fade" appear>
            <div class="loader loading loading-lg" v-if="!loaded"></div>
        </transition>

        <transition name="fade" appear>
            <div class="container" v-if="loaded">
                <div class="columns">
                    <Navbar :favourites="favourites"/>
                    <MealsFilter :meals="meals" />
                    <Meals :meals="meals" :loaded="loaded" :favourites="favourites"/>
                </div>
            </div>  
        </transition>  

    </div>
</template>

<script>
    import axios from "axios";
    import lodash from "lodash";
    import Navbar from "./components/Navbar";
    import Meals from "./components/Meals";
    import MealsFilter from "./components/MealsFilter";
    
    export default {
        data() {
            return {
                startEndpoint: "https://www.themealdb.com/api/json/v1/1/latest.php",
                searchEndpoint: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
                meals: [],
                favourites: [],
                loaded: false
            }
        },
        methods: {
            dataInit(){
                axios.get(this.startEndpoint)
                    .then(res => { 
                        this.loaded = true;
                        this.meals = res.data.meals; 
                });
            },
            querySearch(query = this.query) {
                //get meals searched by name
                axios.get(this.searchEndpoint + query)
                    .then(res => {
                        if (res.data.meals == null){
                            this.meals = [];
                        }else{
                            this.meals = res.data.meals;
                    }
                });
            },            
            filterByTags(tag) {
                //filter meals by selected "tags" tags
                this.meals = this.meals.filter(meal => meal.strTags && !meal.strTags.includes(tag));
            },
            filterByArea(area) {
                //filter meals by selected "area" tags 
                this.meals = this.meals.filter(meal => meal.strArea && !meal.strArea.includes(area));
            },
            filterByCategory(category) {
                //filter meals by selected "category" tags 
                this.meals = this.meals.filter(meal => meal.strCategory && !meal.strCategory.includes(category));
            },
            addToFavourites(id, name, src) {
                //add meal to favourites and update localstorage
                this.favourites.push({ id: id, name: name, src: src });
                localStorage.setItem("favourites", JSON.stringify(this.favourites));
            },
            removeFromFavourites(id) {
                //in favourites find index meal to remove, and remove it from array
                let index = _.findIndex(this.favourites, ["id", id])
                this.favourites.splice(index, 1);
                localStorage.setItem("favourites", JSON.stringify(this.favourites));
            }                                   
        },
        components: {
            Navbar,
            Meals,
            MealsFilter
        },
        created() {  
            //load last 10 meals
            this.dataInit();

            //if favorites are stored in localstorage, load them into application
            if(localStorage.getItem("favourites")) {
                let data = localStorage.getItem("favourites");
                this.favourites = JSON.parse(data);
            }

            //mount events
            this.$events.$on("filterbycategory", this.filterByCategory);
            this.$events.$on("filterbyarea", this.filterByArea);
            this.$events.$on("filterbytags", this.filterByTags);      

            this.$events.$on("removefromfavourites", this.removeFromFavourites);
            this.$events.$on("addtofavourites", this.addToFavourites);

            this.$events.$on("querySearch", this.querySearch);   

            this.$events.$on("dataInit", this.dataInit);             
        },
        destroyed() {   
            //unmount events 
            this.$events.$off("filterbycategory", this.filterByCategory);
            this.$events.$off("filterbyarea", this.filterByArea);
            this.$events.$off("filterbytags", this.filterByTags);  

            this.$events.$off("removefromfavourites", this.removeFromFavourites);
            this.$events.$off("addtofavourites", this.addToFavourites);

            this.$events.$off("querySearch", this.querySearch);   

            this.$events.$off("dataInit", this.dataInit);              
        }  
    }
</script>

<style>
    @import "./../node_modules/spectre.css";

    @font-face {
        font-family: 'fontello';
        src: url('./assets/fontello/font/fontello.eot?84923721');
        src: url('/assets./fontello/font/fontello.eot?84923721#iefix') format('embedded-opentype'),
            url('./assets/fontello/font/fontello.woff2?84923721') format('woff2'),
            url('./assets/fontello/font/fontello.woff?84923721') format('woff'),
            url('./assets/fontello/font/fontello.ttf?84923721') format('truetype'),
            url('./assets/fontello/font/fontello.svg?84923721#fontello') format('svg');
        font-weight: normal;
        font-style: normal;
    }
     
    [class^="icon-"]:before, [class*=" icon-"]:before {
        font-family: "fontello";
        font-style: normal;
        font-weight: normal;
        speak: none;
        display: inline-block;
        text-decoration: inherit;
        width: 1em;
        margin-right: .2em;
        text-align: center;
        font-variant: normal;
        text-transform: none;
        line-height: 1em;
        margin-left: .2em;
        /* Font smoothing. That was taken from TWBS */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
     
    .icon-heart:before { content: '\e800'; } /* '' */
    .icon-heart-empty:before { content: '\e801'; } /* '' */
    .icon-search:before { content: '\e802'; } /* '' */
    .icon-menu-1:before { content: '\e803'; } /* '' */
    .icon-menu:before { content: '\f0c9'; } /* '' */

    .loader{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: #fff;
    }

    .fade-enter-active,
    .fade-leave-active,
    .fade-details-enter-active,
    .fade-details-leave-active {
        transition: opacity .5s ease-in-out;
    }

    .fade-move,
    .fade-details-move {
        transition: transform .5s ease-in-out;
    }

    .fade-enter,
    .fade-leave-to,
    .fade-details-enter,
    .fade-details-leave-to {
        opacity: 0;
    }    
</style>