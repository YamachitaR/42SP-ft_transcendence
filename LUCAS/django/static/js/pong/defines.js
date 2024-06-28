export default function setDefines(data) {
    var defines = createDefines();
    defines.init_v = setPreference1(data.setPreference1);
    defines.paddle_v = setPreference2(data.setPreference2);
    defines.ball_url = setPreference3(data.setPreference3);
    defines.ground_url = setPreference4(data.setPreference4);
    defines.MaxPoints = setPreference5(data.setPreference5);
    return defines;
}

function createDefines(){
    return {
        width: 800,
        height: 500,
        MaxPoints: 1,
        l_color: 'white',
        r_color: 'white',
        ball_color: 'white',
        ground_color: 'black',
        init_v: 1,
        paddle_v: 1,
        ball_url: '/static/img/ball.png',
        ground_url: '/static/img/quadra_basquete.jpg',
        name_left: "Player1",
        name_right: "Player2",
    };
}

//velocidade inical
function setPreference1(dataPreference) {
    var preference = 'default';
    
    switch (dataPreference) {
        case 'Padrao':
            preference = 1;
            break;
        case 'Lenta':
            preference = 0.5;
          break;
        case 'Rapida':
            preference = 2;
          break;
        case 'Super_rapida':
            preference = 4;
          break;
        default:
            preference = 1;
    }

    return preference;
}

//velocidade das raquete
function setPreference2(dataPreference) {
    var preference = 'default';
    
    switch (dataPreference) {
        case 'Padrao':
            preference = 1;
            break;
        case 'Lenta':
            preference = 0.5;
          break;
        case 'Rapida':
            preference = 2;
          break;
        case 'Super_rapida':
            preference = 4;
          break;
        default:
            preference = 1;
    }

    return preference;
}

//skin da bola
function setPreference3(dataPreference) {
    var preference = 'none';

    switch (dataPreference) {
        case 'Branca_(Padrao)':
            preference = 'none';
            break;
        case 'Tenis':
            preference = '/static/img/pong/bola_tenis.png';
          break;
        case 'Baseball':
            preference = '/static/img/pong/bola_baseball.png';
          break;
        case 'Basquete':
            preference = '/static/img/pong/bola_basquete.png';
          break;
        default:
            preference = 'none';
    }

    return preference;
}

//skin da quadra
function setPreference4(dataPreference) {
    var preference = 'none';
    
    switch (dataPreference) {
        case 'Preta_(Padrao)':
            preference = 'none';
            break;
        case 'Tenis':
            preference = '/static/img/pong/quadra_tenis.png';
          break;
        case 'Baseball':
            preference = '/static/img/pong/quadra_baseball.png';
          break;
        case 'Basquete':
            preference = '/static/img/pong/quadra_basquete.png';
          break;
        default:
            preference = 'none';
    }

    return preference;
}

//pontos maximos
function setPreference5(dataPreference) {
    var preference = 11;

    switch (dataPreference) {
        case '11_Pontos_(Padrao)':
            preference = 11;
            break;
        case '1_Pontos':
            preference = 1;
          break;
        case '3_Pontos':
            preference = 3;
          break;
        case '20_Pontos':
            preference = 20;
          break;
        default:
            preference = 11;
      }
    return preference;
}