import assert from 'assert'
import { Barman } from '../src/barmen'
import { Client} from '../src/client'


suite('Stub: when client ask 200 grams of whisky', function () {
    var client = new Client();
    let drinkName = 'whisky';
    setup(function(){
        client.sober();
    })
    suite('barman has enough', function () {

    });

    suite('no whisky in bar', function () {

    });


    teardown(function() {
        console.log('teardown');
    })
});