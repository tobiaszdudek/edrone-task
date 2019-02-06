<template>
	<div class="container">
		<header class="columns navbar">
	        <section class="navbar__logo column col-3 col-lg-12">
	            <i class="navbar__logo--icon icon-menu c-hand tooltip tooltip-right" @click="dataInit" data-tooltip="start over"></i>
	        </section>

	        <section class="navbar__searchengine column col-6 col-lg-12">
	            <i class="navbar__searchengine--icon icon-search"></i>
	            <input class="navbar__searchengine--query form-input" type="text" placeholder="SEARCH" v-model="query">
	        </section>

	        <Favourites :favourites="favourites"/>              
	    </header>		
	</div>
</template>

<script>
	import Favourites from "./Favourites";
	export default {
	 	name: "Navbar",
	 	data(){
	 		return {
	 			query: ""
	 		}
	 	},
		props: {
	   		favourites: Array
	  	},
        watch: {
            query() {
            	this.querySearch();
            }
        },	
		methods: {
			dataInit(){
				this.$events.$emit("dataInit");
			},
            querySearch: _.debounce(function() {
                this.$events.$emit("querySearch", this.query);
            }, 100)
		},
		components: {
			Favourites
		}		       	
	}
</script>

<style lang="scss">
	.navbar{
		background: #FFFF8C;
		padding: 10px 0;

		&__logo{
			padding-left: 1rem;

			&--icon{
				font-size: 1.2rem;
			}
		}

		&__searchengine{
			position: relative;
            padding-left: 1rem;

            &--icon{
            	position: absolute;
                left: 30px;
                top: 5px;
                color: #7A7A7A;
            }

            &--query{
                background: none;
                border-radius: .3rem;
                border: 1px solid #7A7A7A;
                color: #7A7A7A;
                width: 100%;
                padding-left: 35px;

                &::placeholder {
                    color: #7A7A7A;
                } 
            }

            @media  screen and (max-width: 960px) {
                padding: 0 1rem;
            } 
		}	

        section{
            @media only screen and (max-width: 960px) {
                margin: 10px 0;
            } 
        } 		
	}
</style>