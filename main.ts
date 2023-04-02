function help () {
    serial.writeLine("Command help-------")
    serial.writeLine("1:Mot stat")
    serial.writeLine("test [p1 p2 ..]:param test")
    serial.writeLine("pwm[ch 0..1][duty 0..1024]:pwmDuty")
    serial.writeLine("-----------Ver0.1--")
}
function parameterInputTest (list: any[]) {
    i = 0
    while (i < list.length) {
        serial.writeLine("" + (list[i]))
        i += 1
    }
}
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    Hi = pins.pulseIn(DigitalPin.P2, PulseValue.High)
    Lo = pins.pulseIn(DigitalPin.P2, PulseValue.Low)
})
function motStat () {
    serial.writeNumbers([
    speed,
    Hi,
    Lo,
    Hi / (Hi + Lo)
    ])
}
function pwmOut (list2: number[]) {
    if (list2[1] == 0) {
        pins.analogWritePin(AnalogPin.P0, list2[2])
    } else {
        if (list2[1] == 1) {
            pins.analogWritePin(AnalogPin.P1, list2[2])
        } else {
            return 0
        }
    }
    serial.writeNumbers([list2[1], list2[2]])
    return 1
}
let comArr: string[] = []
let comStr = ""
let Lo = 0
let Hi = 0
let i = 0
let speed = 0
speed = 500
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 10000)
pins.analogWritePin(AnalogPin.P1, 512)
pins.analogSetPeriod(AnalogPin.P1, 10000)
pins.setEvents(DigitalPin.P2, PinEventType.Pulse)
serial.writeLine("**MicroBit test***")
basic.forever(function () {
    serial.writeLine("")
    serial.writeString(">")
    comStr = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    comArr = comStr.split(" ")
    if (comArr[0] == "?") {
        help()
    }
    if (comArr[0] == "1") {
        motStat()
    }
    if (comArr[0] == "pwm") {
        let list2: number[] = []
        serial.writeLine(comStr)
        if (pwmOut(list2) == 0) {
            serial.writeLine("ERR")
        }
    }
    if (comArr[0] == "test") {
        serial.writeLine(comStr)
        parameterInputTest(comArr)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        speed += 10
    }
    if (input.buttonIsPressed(Button.B)) {
        speed += -10
    }
    if (speed > 1000) {
        speed = 1000
    }
    if (speed < 0) {
        speed = 0
    }
})
