(function(){
  var current_keys_down = [];
  var key_codes = {
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40,
  };

  document.addEventListener('keydown', on_keydown);
  document.addEventListener('keyup', on_keyup);

  function on_keydown(e) {
    if (!is_key_down(e.keyCode)) {
      current_keys_down.push(e.keyCode);
    }
  }

  function on_keyup(e) {
    if (is_key_down(e.keyCode)) {
      current_keys_down.splice(current_keys_down.indexOf(e.keyCode), 1);
    }
  }

  function is_key_down(key_code) {
    if (key_codes[key_code]) {
      key_code = key_codes[key_code];
    }
    if (current_keys_down.indexOf(key_code) == -1) {
      return false;
    } else {
      return true;
    }
  }

  window.is_key_down = is_key_down;
}());
