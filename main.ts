pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    Hi = pins.pulseIn(DigitalPin.P2, PulseValue.High)
    Lo = pins.pulseIn(DigitalPin.P2, PulseValue.Low)
})
let i = 0
let comArr: string[] = []
let comStr = ""
let Hi = 0
let Lo = 0
let speed = 500
pins.analogWritePin(AnalogPin.P0, 512)
pins.analogSetPeriod(AnalogPin.P0, 100)
Lo = 0
Hi = 0
pins.setEvents(DigitalPin.P2, PinEventType.Pulse)
serial.writeLine("**MicroBit test***")
serial.writeString(">")
basic.forever(function () {
    comStr = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    comArr = comStr.split(" ")
    if (comArr[0] == "?") {
        serial.writeLine("Command help-------")
        serial.writeLine("x:Motor cont stat")
        serial.writeLine("test [p1 p2 ..]:parameter test")
        serial.writeLine("-----------Ver0.1--")
    }
    if (comArr[0] == "x") {
        serial.writeNumbers([
        speed,
        Hi,
        Lo,
        Hi / (Hi + Lo)
        ])
    }
    if (comArr[0] == "test") {
        serial.writeLine(comStr)
        i = 0
        while (i <= comArr.length - 1) {
            serial.writeLine("" + (comArr[i]))
            i += 1
        }
    }
    serial.writeLine("")
    serial.writeString(">")
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
    pins.analogWritePin(AnalogPin.P0, speed)
    basic.pause(100)
})
