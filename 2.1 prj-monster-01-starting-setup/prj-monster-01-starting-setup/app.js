function getrandomvalue(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

var app= Vue.createApp({
    data(){
        return {
            playerhealth:100,
            monsterhealth:100,
            currentround:0,
            winner:null,
            logmessages:[],
        }
    },
    watch:{
        playerhealth(value){
            if(value <=0 && this.monsterhealth<=0){
                this.winner='draw'
            }
            else if (value <=0){
                this.winner='monster'
            }
        },

        monsterhealth(value){
            if (value <=0 && this.playerhealth <=0){
                this.winner='draw'
            }
            else if (value <= 0){
                this.winner="player"
            }
        }
    },

    computed:{
        monsterbarstyles(){
            if(this.monsterhealth < 0){
                return {width: '0%'}
            }

            return {width: this.monsterhealth +'%'}
        },

        playerbarstyles(){
            if (this.playerhealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerhealth +'%'}
        },
 
        mayusespecialattack(){
            return this.currentround % 3 !==0
        },
    },

    methods:{
        startgame(){
            this.playerhealth=100
            this.monsterhealth=100
            this.currentround=0
            this.winner=''
            this.logmessages=[]
        },

        attackmonster(){
            this.currentround+=1
            var attackvalue =getrandomvalue(5,12)
            this.monsterhealth-=attackvalue;
            this.addlogmessage('player','attack', attackvalue)
            this.attackplayer();

        },

        attackplayer(){
            var attackvalue =getrandomvalue(8,15)
            this.playerhealth-=attackvalue;
            this.addlogmessage('monster','attack', attackvalue)
        },

        specialattackmonster(){
            this.currentround+=1
            var attackvalue =getrandomvalue(10,25)
            this.monsterhealth-=attackvalue;
            this.addlogmessage('player','special-attack', attackvalue)
            this.attackplayer(); 
        },

        healplayer(){
            this.currentround+=1
            var healvalue=getrandomvalue(8,20)
            if (this.playerhealth+healvalue>100){
                this.playerhealth=100    
            }

            else{
                this.playerhealth+=healvalue
            }
            this.addlogmessage('player','heal', healvalue)
            this.attackplayer()
        },

        surrender(){
            this.winner='monster'
        },

        addlogmessage(who,what,value){
            this.logmessages.unshift({
                actionby:who,
                actiontype:what,
                actionvalue:value,
            }
            )
        },

    }

});

app.mount('#game')

