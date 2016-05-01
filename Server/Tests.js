//The tests to be run.
test("test find game", function(){
    var player = addPlayer(1);
    equal("0", player.gameid, "We expect value to be 0");
});

test("test game after 4 people have joined", function(){
    //the first player is added in the first test.
    var player;
    for (var i = 0; i < 4; i++){
        player=addPlayer(i);
    }
    equal("1", player.gameid, "We expect value to be 0");
});

test("check readyness of game 0", function(){
    equal(true, checkReady(0), "We expect value to be true");
});
