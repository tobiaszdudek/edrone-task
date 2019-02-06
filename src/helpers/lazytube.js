export function lazytube(id){
    let youtube = document.querySelector( ".youtube" );
    let iframe = document.createElement( "iframe" );
    
    iframe.setAttribute( "class", "video" );
    iframe.setAttribute( "frameborder", "0" );
    iframe.setAttribute( "allowfullscreen", "" );
    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ id +"?rel=0&showinfo=0&autoplay=1" );
    youtube.innerHTML = "";
    youtube.appendChild( iframe );
}