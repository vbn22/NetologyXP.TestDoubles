'use strict';

module.exports= {
    Barman: function(cupboard){
        this.check_age = function(age){
            return age > 18 ? true:false;
        };
        this.check_warehouse = function(){
            return 'checked';
        };
        this.pour = function(drinkName, volume, client) {
            if (volume < 0) {
                throw new Error('Invalid volume of whisky');
            }

            if(client.isDrunken()){
                return 0;
            }

            if(!cupboard.hasDrink(drinkName, volume)){
                this.check_warehouse();
                throw new Error('Not enough ' + drinkName);
            }

            return cupboard.getDrink(drinkName, volume);
        };
    }}