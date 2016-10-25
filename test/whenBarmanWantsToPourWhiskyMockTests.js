import assert from 'assert'
import sinon from 'sinon'
import { Barman } from '../src/barmen'
import { Client} from '../src/client'
import { Cupboard} from '../src/cupboard'


suite('Mock: when client ask 200 grams of whisky', function () {
    var client = new Client();
    let drinkName = 'whisky';
    setup(function(){
        client.sober();
    })
    suite('barman has enough', function () {
        let barman;
        let barmanMock;
        let cupboard;
        let cupboardMock;
        setup(function(){
            cupboard = new Cupboard();
            cupboardMock = sinon.mock(cupboard);

            barman = new Barman(cupboard);
            barmanMock = sinon.mock(barman);
        })
        test('Barman pour 200 grams of whisky',function () {
            cupboardMock.expects('hasDrink').once().returns(true);
            cupboardMock.expects('getDrink').once().returns(200);

            let clientAskValume = 200;
             barman.pour(drinkName,clientAskValume,client);

            cupboardMock.restore();
            cupboardMock.verify();
        })
        
        test('Barman check age and resolution of client',function () {
            barmanMock.expects('check_age').once().returns(true);

            barman.check_age(20);

            barmanMock.restore();
            barmanMock.verify();

        })
    });

    suite('no whisky in bar', function () {
        let cupboard = {
            hasDrink: function(){
                return false;
            },
            getDrink: function(){
                return 0;
            }
        }
        let barman;
        let barmanMock;

        setup(function(){
            barman = new Barman(cupboard);
            barmanMock = sinon.mock(barman);
        })

        test('Barman check warehouse',function () {
            barmanMock.expects('check_warehouse').once();

            let clientAskValume = 200;
            assert.throws(function () {
                barman.pour(drinkName,clientAskValume,client)
            },/Not enough whisky/)

            barmanMock.restore();
            barmanMock.verify();

        })

    });

    teardown(function() {
        console.log('teardown');
    })
});