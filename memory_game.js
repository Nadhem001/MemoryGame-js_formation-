function stopCliking(){
    // Add class no Cliking on Main container 
    blocksContainer.classList.add("no-clicking");

    setTimeout(()=>{
        //remove class no clicking after the duration
        blocksContainer.classList.remove("no-clicking");    
    },duration)
}

function checkMatchedBlocks(firstBlock,secondBlock){

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();

    }else{
       
        setTimeout(()=>{
            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration);

        document.getElementById("fail").play();
    }

}


function flipBlock(selectedBlock){
    
    selectedBlock.classList.add("is-flipped");


    //collect All Flipped card

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    if (allFlippedBlocks.length === 2){

        stopCliking();

        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
}

//shuffle function 

function shuffle(array){

    let current = array.length;
    let temp;
    let random;

    while (current > 0){
        random = Math.floor(Math.random() * current);
        current --;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp ;

    }
    return array;
}



document.querySelector(".control-buttons span").onclick= function (){
    let yourName = prompt("whats your name ?");
    
    if (yourName == null || yourName ==""){
        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    
    document.querySelector(".control-buttons").remove();
}

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
 
shuffle(orderRange);
 

// add order Css property to game blocks

blocks.forEach((block,index) =>{
   
    block.style.order = orderRange[index];
    
    block.addEventListener('click',function(){
        flipBlock(block);
    });
});

