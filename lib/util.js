function randint(a,b){return a+Math.floor(Math.random()*(++b-a))}

function typeve(thing) {
  var type = typeof(thing);
  if (type === 'object') {
    if (Array.isArray(thing)) {
      return 'array';
    }
    if (thing === null) {
      return 'null';
    }
  }
  return type;
}

function log(x, b) {
  if (b === undefined) {
    return Math.log(x);
  }
  else {
    return Math.log(x) / Math.log(b);
  } 
}

var shortScale = ['M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg', 'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg', 'Tg', 'Utg', 'Dtg', 'Ttg', 'Qatg', 'Qitg', 'Sxtg', 'Sptg', 'Octg', 'Notg', 'Qag', 'Uqag', 'Dqag', 'Tqag', 'Qaqag', 'Qiqag', 'Sxqag', 'Spqag', 'Ocqag', 'Noqag', 'Qig', 'UQig', 'DQig', 'TQig', 'QaQig', 'QiQig', 'SxQig', 'SpQig', 'OcQig', 'NoQig', 'Sxg', 'USxg', 'DSxg', 'TSxg', 'QaSxg', 'QiSxg', 'SxSxg', 'SpSxg', 'OcSxg', 'NoSxg', 'Spg', 'USpg', 'DSpg', 'TSpg', 'QaSpg', 'QiSpg', 'SxSpg', 'SpSpg', 'OcSpg', 'NoSpg', 'Ocg', 'UOcg', 'DOcg', 'TOcg', 'QaOcg', 'QiOcg', 'SxOcg', 'SpOcg', 'OcOcg', 'NoOcg', 'Nog', 'UNog', 'DNog', 'TNog', 'QaNog', 'QiNog', 'SxNog', 'SpNog', 'OcNog', 'NoNog', 'C', 'Uc'];

function sciSig(man, sig) {
  man = man.substr(0,sig+1);
  while ('0.'.indexOf(man[man.length-1]) != -1) {
    man = man.substr(0, man.length-1);
  }
  return man
}

function renderSci(val) {
  var man = val.toExponential();
  var exp = Number(man.substr(man.search('e') + 1));
  var man = man.substr(0, man.search('e')); 
  if (val >= 0 && val < 1000000) {
    return renderShort(val);
  }
  return sciSig(man, 4) + 'e' + exp;
}

function engSig(man, exp, sig) {
    man = man[0] + man.substr(2, sig-1);
    exp = exp % 3;
    for (var i = 0; i < (3 - exp); i++) {
      if (man[man.length - 1] == '0') {
        man = man.substr(0, man.length - 1);
        console.log(man);
      }
      else {
        break;
      }
    }
    while (man.length < exp + 1) {
      man += '0';
    }
    if (man.length == exp + 1) {
      return man;
    }
    else {
      return man.substr(0, exp + 1) + '.' + man.substr(exp + 1);
    }
}

function renderEng(val) {
  var man = val.toExponential();
  var exp = Number(man.substr(man.search('e') + 1));
  var man = man.substr(0, man.search('e')); 
  if (val >= 0 && val < 1000000) {
    return renderShort(val);
  }
  return engSig(man, exp, 4) + 'e' + exp;
}

function renderShort(val) {
  var man = val.toExponential();
  var exp = Number(man.substr(man.search('e') + 1));
  var man = man.substr(0, man.search('e'));
  if (exp < 0) {
    if (val == 0) return '0';
    return renderSci(val);
  }
  else if (exp < 3) {
    return engSig(man, exp, 4);
  }
  else if (exp < 6) {
    man = man[0] + man.substr(2, exp);
    while (man.length < exp + 1) {
      man += '0';
    }
    return man.substr(0, exp - 2) + ',' + man.substr(exp - 2);
  }
  else {
    var suffix = Math.floor(exp / 3) - 2;
    return engSig(man, exp, 4) + ' ' + shortScale[suffix];
  }
}