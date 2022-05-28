new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
        },
        atacar: function () {
            var damage = this.calcularHeridas(this.rangoAtaque[0], this.rangoAtaque[1])
            this.saludMonstruo -= damage;
            this.turnos.unshift({
                esJugador: true,
                text : "El jugador ataca al monstruo por " + damage
            })

            this.verificarGanador()
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var damage = this.calcularHeridas(this.rangoAtaqueEspecial[0], this.rangoAtaque[1])
            this.saludMonstruo -= damage;
            this.turnos.unshift({
                esJugador: true,
                text : "El jugador golpea duramente al monstruo por " + damage
            })
            
            this.verificarGanador();
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
            this.turnos.unshift({
                esJugador: true,
                text : "El jugador se cura en 10"
            })
            this.ataqueDelMonstruo()
        },

        registrarEvento(evento) {

        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
            this.saludJugador = 100
            this.saludMonstruo = 100
        },

        ataqueDelMonstruo: function () {
            var damage = this.calcularHeridas(this.rangoAtaqueDelMonstruo[0], this.rangoAtaqueDelMonstruo[1]);
            this.saludJugador -= damage;
            this.turnos.unshift({
                esJugador: false,
                text : "El monstruo ataca al jugador por " + damage
            })
            
            
            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm("Ganaste! jugar de nuevo?")){
                    this.empezarPartida();
                } else {
                    this.terminarPartida();
                }
                
            } else if(this.saludJugador <= 0){
                if(confirm("Perdiste! jugar de nuevo?")){
                    this.empezarPartida();
                } else {
                    this.terminarPartida();
                }

            }
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});