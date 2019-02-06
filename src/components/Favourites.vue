<template>
	<section class="favourites column col-3 col-lg-12">
	    <div class="favourites__box c-hand" 
	    	:class="{'active' : toggleFavourites, 'inactive' : !favourites.length }" 
	    	@mouseover.stop.prevent="toggleFavourites=true" 
	    	@mouseleave.stop.prevent="toggleFavourites=false">

	        <span class="text-uppercase">favourites</span>
	        <i class="icon icon-heart-empty"></i>
	        
	        <div class="favourites__box--list" v-if="favourites.length">
	            <ul>
	                <li v-for="fav in favourites" @click="querySearch(fav.name)">
	                    <img v-if="fav.src" :src="fav.src" width="40" :alt="fav.name">
	                    <img v-else src="../assets/cover.jpg" width="40" alt="cover">
	                    <span>{{ fav.name }}</span>
	                </li>
	            </ul>
	        </div>
	    </div>
	</section>
</template>

<script>
	export default {
	 	name: "Favourites",
	 	data(){
	 		return {
	 			toggleFavourites: false
	 		}
	 	},
		props: {
			favourites: Array
	  	},
		methods: {
	    	querySearch(name) {
	      		this.$events.$emit("querySearch", name);
	    	}     
		}
	}
</script>

<style lang="scss" scoped>
	.favourites{
		padding-right: 1rem;

		&__box{
			width: 100%;
			height: 1.8rem;
			position: relative;
			border: 1px solid #7A7A7A;
			color: #7A7A7A;
			border-radius: .3rem;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: opacity .3s ease-in-out;	

			&.inactive{
				opacity: .5;
				pointer-events: none;
				transition: opacity .3s ease-in-out;	
			}	

			&.active{
				background: #fff;
			}

			&--list{
				position: absolute;
				right: -1px;
				top: 28px;
				background: #fff;
				width: calc(100% + 2px);
				border-bottom-left-radius: .3rem;
				border-bottom-right-radius: .3rem;
				border: 1px solid rgba(0, 0, 0, .3);
				border-top: 0px;
				padding: 10px 0;
				z-index: 2;
				opacity: 0;
				will-change: transform;
				transform: translateY(-100%);
				transition: all .2s ease-in-out;	

				 ul{
				 	margin: 0px;

				 	li{
						list-style-type: none;
						overflow: hidden;
						display: flex;
						align-items: center;
						padding: 2px 10px;
						transition: all .3s ease-in;	

						&:hover{
							background: #FFFF8D;
							transition: all .3s ease-in;						
						}	

						img{
							float: left;
							margin-right: 20px;						
						} 			
				 	}
				}		
			}

			&:hover .favourites__box--list{
				opacity: 1;
				transform: translateY(0em);
				transition: all .5s ease-in-out;
			}
		}

		@media screen and (max-width: 960px) {
			padding: 0 1rem;
		}	
	}
</style>