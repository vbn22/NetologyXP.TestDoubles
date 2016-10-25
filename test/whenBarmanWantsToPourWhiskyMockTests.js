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

            let clientAskValume = 200;
            barman.check_age(20);
            barman.pour(drinkName,clientAskValume,client);

            barmanMock.restore();
            barmanMock.verify();

        })
    });

    suite('no whisky in bar', function () {
        //test('barman send SMS to the boss', function () {
        //});
    });

    teardown(function() {
        console.log('teardown');
    })
});