'use strict';

module.exports= {
    Barman: function(cupboard){
        this.check_age = function(age){
            return age > 18 ? true:false;
        };

        this.pour = function(drinkName, volume, client) {
            if (volume < 0) {
                throw new Error('Invalid volume of whisky');
            }

            if(client.isDrunken()){
                return 0;
            }

            if(!cupboard.hasDrink(drinkName, volume)){
                throw new Error('Not enough ' + drinkName);
            }

            return cupboard.getDrink(drinkName, volume);
        };
    }}