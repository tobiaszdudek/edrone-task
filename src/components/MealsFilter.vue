<template>
    <div class="sidebar column col-3 col-md-12">
        <div class="sidebar__tags">
            <h3>Category</h3>
            <div class="sidebar__tags--wrapper">
                <span v-for="cat in getCategoryFilters" @click="filterByCategory(cat)" class="chip text-uppercase">{{ cat }}
                    <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
                </span>
            </div>

            <h3>Area</h3>
            <div class="sidebar__tags--wrapper">
                <span v-for="area in getAreaFilters" @click="filterByArea(area)" class="chip text-uppercase">{{ area }}
                    <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
                </span>
            </div>
             
            <h3>Tags</h3>
            <div class="sidebar__tags--wrapper">
                <span v-for="tag in getTagsFilters" @click="filterByTags(tag)" class="chip text-uppercase">{{ tag }}
                    <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MealsFilter",
        props: {
            meals: Array
        },
        computed: {
            getAreaFilters() {
                //get "area" tags from displayed meals
                return _.uniq(this.meals.map(
                    meal => meal.strArea
                ));
            },
            getTagsFilters() {
                //get "tags" tags from displayed meals
                return  _.compact(_.uniq(this.meals.map(
                    meal => meal.strTags).join().split(",")
                ));
            },
            getCategoryFilters() {
                //get "category" tags from displayed meals
                return _.uniq(this.meals.map(
                    meal => meal.strCategory
                ));
            },
        },
        methods: {
            filterByCategory(cat) {
                this.$events.$emit("filterbycategory", cat);
            },
            filterByArea(area) {
               this.$events.$emit("filterbyarea", area);
            },
            filterByTags(tag) {
                this.$events.$emit("filterbytags", tag);
            }            
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        background: #B7B7B7;
        padding: 1rem;
        min-height: calc(100vh - 56px);
        z-index: 1;

        &__tags{
            &--wrapper{
                border: 1px solid gray;
                border-radius: .4rem;
                padding: .5rem;
                width: 100%;
                margin-bottom: 30px; 
            }        
        }

        @media screen and (max-width: 960px) {
            min-height: auto;
        }        
    }
</style>