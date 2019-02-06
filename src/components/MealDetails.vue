<template>
    <div class="details columns">
        <div v-if="selected.strYoutube && youtubeCover" class="details__media col-4 col-lg-12" :key="componentKey">
            <div class="youtube" :data-embed="youtubeId">
                <div class="play-button c-hand" @click="loadTube"></div>
                <img :src="youtubeCover" class="cover c-hand">
            </div>
        </div>

        <article class="details__text col-lg-12" :class="{'col-8' : selected.strYoutube, 'col-12' : !selected.strYoutube}">
            <h4>Instruction</h4>
            <p>{{ selected.strInstructions }}</p>

            <h4>Ingredients + Measure</h4>
            <div>
                <ul>
                    <li v-for="item in ingredientsAndMeasures">
                        {{ item[0]  + ': ' + item[1] }}
                    </li>
                </ul>              
            </div>

            <p v-if="selected.strSource">Source: <a :href="selected.strSource">{{ selected.strSource }}</a></p>
        </article>  
    </div>
</template>

<script>
    import { lazytube } from "../helpers/lazytube"
    import getYouTubeID from "get-youtube-id"; 

    export default {
        name: "MealDetails",
        data(){
            return{
                componentKey: 0
            }
        },
        props: {
            selected: Object
        }, 
        computed: {
            youtubeId(){
                //get id video from url
                return getYouTubeID(this.selected.strYoutube)
            },         
            youtubeCover(){
                //get video cover
                return `https://img.youtube.com/vi/${this.youtubeId}/hqdefault.jpg`
            },
            ingredients(){
                //get all ingredients
                return Object.entries(this.selected).filter((key) =>
                    key[0].includes("strIngredient") && key[1] ? true : false
                ).map(val => val[1]);;
            },
            measures(){
                //get all measures
                return Object.entries(this.selected).filter((key) =>
                    key[0].includes("strMeasure") && key[1] ? true : false
                ).map(val => val[1]);
            },
            ingredientsAndMeasures(){
                //join ingredients and measures
                return this.ingredients.map((v,i) => [v, this.measures[i]]);
            }
        },
        methods: {  
            loadTube(){
                //load and play video
                lazytube(this.youtubeId);      
            }            
        },
        beforeUpdate(){
            this.componentKey += 1;  
        }                     
    }
</script>

<style lang="scss">
.details {
    border: 1px solid lightgray;
    border-radius: .3rem;
    margin: 0 .4rem .4rem .4rem;
    overflow: hidden;

    &__text{
        padding: 1rem;
    }

    &__media{

        .youtube {
            position: relative;
            width: 100%;
            height: 300px;
            overflow: hidden;

            .cover,
            .video,
            .play-button,
            .play-button:before {
                position: absolute;
            }    

            .video {
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
            } 

            .cover{
                width: auto;
                max-height: 100%;
                height: auto;

                @media screen and (max-width: 960px) {
                    position: static;
                    display: block;
                    margin: 0 auto;
                }                   
            }

            .play-button,
            .play-button:before {
                top: 50%;
                left: 50%;
                transform: translate3d( -50%, -50%, 0 );
            } 

            .play-button {
                width: 90px;
                height: 60px;
                background-color: #333;
                box-shadow: 0 0 30px rgba( 0,0,0,0.6 );
                z-index: 1;
                opacity: 0.8;
                border-radius: 6px;

                &:before{
                    content: "";
                    border-style: solid;
                    border-width: 15px 0 15px 26.0px;
                    border-color: transparent transparent transparent #fff;                    
                }
            }            
        }      

        @media screen and (max-width: 960px) {
            padding-top: 1rem;
        }           
    }
}
</style>