(function(){
  // height of image is 100, but height of actual tile is 50
  var TILE_HEIGHT = 50;
  var TILE_WIDTH = 100;
  var CHARACTER_SPEED = 3;

  var stage = new PIXI.Container();
  var renderer = PIXI.autoDetectRenderer(800, 400);
  var meter = new FPSMeter();
  document.body.appendChild(renderer.view);
  var character;
  var map = {
    'key': {
      'EW': 'end-w.png',
      'EE': 'end-e.png',
      'EN': 'end-n.png',
      'ES': 'end-s.png',
      'F':  'forest.png',
      'G' : 'grass.png',
      'REW': 'road-ew.png',
      'RNS': 'road-ns.png',
      'RNE': 'road-ne.png',
      'RNW': 'road-nw.png',
      'RSE': 'road-se.png',
      'RSW': 'road-sw.png',
    },
    'data': [
      ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
      ['G', 'EW', 'REW', 'REW', 'REW', 'RSW', 'G', 'F', 'F', 'G'],
      ['G', 'F', 'F', 'G', 'G', 'RNS', 'G', 'G', 'F', 'G'],
      ['G', 'G', 'G', 'F', 'G', 'RNE', 'EE', 'G', 'G', 'G'],
      ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ],
  }

  PIXI.loader
    .add('assets/roads.json')
    .load(on_assets_loaded);

  function animate() {
    renderer.render(stage);
    meter.tick();
    move_character();
    window.requestAnimationFrame(animate);
  }

  function on_assets_loaded() {
    generate_map(map);
    generate_character();
    animate();
  }

  function move_character(){
    character.position.x += character_velocity()['x'] * CHARACTER_SPEED;
    character.position.y += character_velocity()['y'] * CHARACTER_SPEED;
  }

  function character_velocity() {
    var velocity = {
      'x' : 0,
      'y' : 0,
    }

    if (window.is_key_down('LEFT')) {
      velocity.x = -1;
    }

    if (window.is_key_down('RIGHT')) {
      velocity.x = 1;
    }

    if (window.is_key_down('UP')) {
      velocity.y = -1;
    }

    if (window.is_key_down('DOWN')) {
      velocity.y = 1;
    }

    if (window.is_key_down('LEFT') && window.is_key_down('UP')) {
      velocity.x = -0.707;
      velocity.y = -0.707;
    }

    if (window.is_key_down('LEFT') && window.is_key_down('DOWN')) {
      velocity.x = -0.707;
      velocity.y = 0.707;
    }

    if (window.is_key_down('RIGHT') && window.is_key_down('UP')) {
      velocity.x = 0.707;
      velocity.y = -0.707;
    }

    if (window.is_key_down('RIGHT') && window.is_key_down('DOWN')) {
      velocity.x = 0.707;
      velocity.y = 0.707;
    }

    return velocity;
  }

  function generate_character() {
    character =  PIXI.Sprite.fromImage('/assets/characters/placeholder.png');
    character.position.x = 0;
    character.position.y = 0;
    stage.addChild(character);
  }

  function generate_map(map) {
    for (var y = 0; y < map['data'].length; y++) {
      for (var x = 0; x < map['data'][y].length; x++) {

        var iso_x = (x - y) * (TILE_WIDTH * 0.5);
        var iso_y = (x + y) * (TILE_HEIGHT * 0.5);

        var key = map['data'][y][x];
        var tile_name = map['key'][key];

        generate_tile(tile_name, iso_x, iso_y);
      }
    }
  }

  function generate_tile(tile_name, iso_x, iso_y) {
    var tile = PIXI.Sprite.fromFrame(tile_name);

    tile.position.x = iso_x;
    tile.position.y = iso_y;

    stage.addChild(tile);
  }
}());
