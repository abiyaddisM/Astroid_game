
    let horPosition = 0;
    let verPosition = 0;
    const cube = document.getElementById("cube");
    const enemies=document.getElementsByClassName("enemy");
    const container=document.getElementById("container");
    let upInter;
    let downInter
    let leftInter;
    let rightInter;
    let loss=false;
    let playerSpeed=5;
    let keys = {}; // Object to store the pressed keys



    document.addEventListener("keydown", function(event) {
        keys[event.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", function(event) {
        keys[event.key.toLowerCase()] = false;
    });

    function moveCube() {
        let containerDim=container.getBoundingClientRect();
        let playerDim=cube.getBoundingClientRect();
        if (keys['w'] ) {
            if(playerDim.top>containerDim.top){
                verPosition -= playerSpeed;
            }

        }
        if (keys['a'] ) {
            if(playerDim.left>containerDim.left){
                horPosition -= playerSpeed;

            }
        }
        if (keys['s']) {
            if (playerDim.bottom < containerDim.bottom) {
                verPosition += playerSpeed;

            }
        }


        if (keys['d']) {
            if(playerDim.right<containerDim.right){
                horPosition += playerSpeed;
            }
        }




        cube.style.transform = `translate(${horPosition}px, ${verPosition}px)`;

        requestAnimationFrame(moveCube);
    }

    // Start the animation loop
    moveCube();



    function getRandomInt(min, max) {
        // Generates   a random integer between min (inclusive) and max (exclusive)
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }


    var fallSpeed=2;
    var spawnPoint=0;
    function createDiv() {
        var newEnemy = document.createElement('div');
        newEnemy.className = 'enemy';
        let randomPosition = getRandomInt(10, 90);
        newEnemy.style.left = `${randomPosition}%`;
        // newEnemy.style.top= `${spawnPoint}px`;
        spawnPoint-=40;
        document.getElementById('enemyContainer').appendChild(newEnemy);
        startFalling(newEnemy);
    }

    function startFalling(enemy) {
        let yPosition = 0;

        function fall() {
            yPosition += fallSpeed;
            enemy.style.top = `${yPosition}px`;
            checkCollision(cube,enemy);

            if (yPosition < container.getBoundingClientRect().height-40) {
                requestAnimationFrame(fall);
            } else {
                enemy.style.visibility="hidden"
                enemy.remove(); // Remove the enemy when it goes out of the screen
            }
        }

        requestAnimationFrame(fall);
    }

    var interval = 200;
   let createDivInter= setInterval(createDiv, interval);

//
//

//
//
       function checkCollision(player, enemy) {
            const rect1 = player.getBoundingClientRect();
            const rect2 = enemy.getBoundingClientRect();

            // Check for horizontal collision
            const horizontalCollision = rect1.left < rect2.right && rect1.right > rect2.left;


            // Check for vertical collision
            const verticalCollision = rect1.top < rect2.bottom && rect1.bottom > rect2.top;

            // Return true if there's both horizontal and vertical collision, else return false
            if (horizontalCollision && verticalCollision) {

                container.remove();
                clearInterval(timerInterval);
                clearInterval(createDivInter);
                if(highScore.innerText<second){
                    setHighScore(second);
                    console.log("dd");
                }
            }
        }

        function gameDifficulty(){
            if(second<40){
                fallSpeed+=2;
                playerSpeed+=1;
            }


        }
      setInterval(gameDifficulty,10000);


        let second=0;
        let timer=document.getElementById("Timer");
        let highScore=document.getElementById("HighScore");

        function timerFunction(){
            second++;
            timer.innerText=`${second}`;
        }
        function setHighScore(score){
            localStorage.setItem("HighScore",`${score}`);
            highScore.innerText=localStorage.getItem("HighScore");

        }

        highScore.innerText=localStorage.getItem("HighScore");


      let timerInterval= setInterval(timerFunction,1000);