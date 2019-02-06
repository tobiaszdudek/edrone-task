<template>
    <div class="column col-4 col-lg-6 col-sm-12">
        <figure class="single-meal c-hand" :class="{'unselected' : selected !== meal.idMeal && selected !== undefined}" >
            <img v-if="meal.strMealThumb" :src="meal.strMealThumb" :alt="meal.strMeal">
            <img v-else src="../assets/cover.jpg" alt="cover">

            <i v-if="!isInFavourites" class="icon icon-heart-empty" @click.stop="addToFavourites(meal.idMeal, meal.strMeal, meal.strMealThumb)"></i>
            <i v-else class="icon icon-heart" @click.stop="removeFromFavourites(meal.idMeal)"></i>

            <figcaption class="text-center text-uppercase">{{ meal.strMeal }}</figcaption>
        </figure>        
    </div>
</template>

<script>
    export default {
        name: "SingleMeal",
        props: {
            meal: Object,
            selected: String,
            isInFavourites: Boolean
        },
        methods: { 
            removeFromFavourites(id) {
                this.$events.$emit("removefromfavourites", id);
            },
            addToFavourites(id, name, src) {
                this.$events.$emit("addtofavourites", id, name, src);
            }    
        }
    }
</script>

<style lang="scss">
    .single-meal {
        margin: .6rem 0;
        border: 1px solid lightgray;
        border-radius: .5rem;
        display: block;
        overflow: hidden;
        position: relative;
        transition: opacity .3s ease-in; 

        figcaption{
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 .5rem;
            background: #fff;
            transition: all .3s ease-in;            
        }

        &:hover figcaption{
            background: #A6DAFF;
            color: #fff;
            transition: all .3s ease-in;            
        }

        .icon{
            position: absolute;
            right: 15px;
            bottom: 80px;
            z-index: 9;
            color: #fff;
            font-size: 1rem;            
        }

        img{
            max-width: 100%;
            display: block;            
        }

        &.unselected{
            opacity: .5;
            transition: opacity .3s ease-in; 
        }
    }
</style>