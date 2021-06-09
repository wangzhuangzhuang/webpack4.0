import '../css/common.less'
import '../css/index.less'


var obj = new Proxy({ wmm: 2 }, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        console.log(receiver);
        return Reflect.set(target, key, value, receiver);
    }
});

obj.wzz = 1
console.log(obj.wzz)
// import home from './home'

// home();

// if (module.hot) {
//     module.hot.accept('./home', () => {
//         import('./home.js').then(module => {
//             module.default()
//         })
//     })
// }
