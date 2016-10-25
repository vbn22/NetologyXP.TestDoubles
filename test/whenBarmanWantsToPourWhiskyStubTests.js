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
        let cupboardStub = {
            hasDrink: function(){
                return true;
            },
            getDrink: function(){
                return 200;
            }
        }
        let barman = new Barman(cupboardStub);
        test('Barman pour 200 grams of whisky',function(){
            let clientAskValume = 200;
            let volumeInGlass =  barman.pour(drinkName,clientAskValume,client);
            assert.equal(clientAskValume,volumeInGlass);
        })
    });

    suite('no whisky in bar', function () {
        let cupboardStub = {
            hasDrink: function(){
                return false;
            },
            getDrink: function(){
                return 0;
            }
        }
        let barman = new Barman(cupboardStub);
        test('Barman is confused',function(){
            let clientAskValume = 200;
            assert.throws(function () {
                barman.pour(drinkName,clientAskValume,client)
            },/Not enough whisky/)
        })
    });


    teardown(function() {
        console.log('teardown');
    })
});