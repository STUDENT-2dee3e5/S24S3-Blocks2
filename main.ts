function Lampe_Eteindre () {
    pins.digitalWritePin(DigitalPin.P1, 0)
}
input.onButtonPressed(Button.A, function () {
    Temps_fermeture = input.runningTime() + Temps_ouverture
    Mode = "entrer"
    Places_libres += -1
})
function Lampe_Allumer () {
    pins.digitalWritePin(DigitalPin.P1, 1)
}
function Affichage () {
    if (Mode == "affichage") {
        Affichage_Nombres_de_places_restantes()
    } else if (Mode == "entrer") {
        Affichage_Entrée(false)
    } else if (Mode == "sortie") {
        Affichage_Entrée(true)
    } else {
    	
    }
}
function Affichage_Nombres_de_places_restantes () {
    basic.showNumber(Places_libres)
}
function Lampe () {
    if (input.lightLevel() < Limite_luminosité) {
        Lampe_Allumer()
    } else {
        Lampe_Eteindre()
    }
}
function Porte_Ouvrir () {
    pins.servoWritePin(AnalogPin.P0, 180)
}
function Obtenir_DISTANCE () {
    return grove.measureInCentimeters(DigitalPin.P2)
}
function Affichage_Entrée (Sortie_: boolean) {
    if (Sortie_) {
        basic.showArrow(ArrowNames.South)
    } else {
        basic.showArrow(ArrowNames.North)
    }
}
function Porte_Fermer () {
    pins.servoWritePin(AnalogPin.P0, 90)
}
function Porte () {
    if (Mode == "entrer" || Mode == "sortie") {
        Porte_Ouvrir()
    } else {
        Porte_Fermer()
    }
}
let Temps_fermeture = 0
let Temps_ouverture = 0
let Limite_luminosité = 0
let Places_libres = 0
let Mode = ""
Mode = "affichage"
Places_libres = 8
Limite_luminosité = 20
let Limite_distance = 5
Temps_ouverture = 15 * 1000
Temps_fermeture = 1e+26
Porte_Fermer()
Lampe_Eteindre()
basic.forever(function () {
    Lampe()
    Affichage()
    Porte()
    if (Obtenir_DISTANCE() < Limite_distance && Mode == "affichage") {
        Temps_fermeture = input.runningTime() + Temps_ouverture
        Mode = "sortie"
        Places_libres += 1
    }
    if (input.runningTime() > Temps_fermeture) {
        Temps_fermeture = 1e+26
        Mode = "affichage"
    }
})
