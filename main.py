def on_pulsed_p2_high():
    global Hi, Lo
    Hi = pins.pulse_in(DigitalPin.P2, PulseValue.HIGH)
    Lo = pins.pulse_in(DigitalPin.P2, PulseValue.LOW)
pins.on_pulsed(DigitalPin.P2, PulseValue.HIGH, on_pulsed_p2_high)

i = 0
comArr: List[str] = []
comStr = ""
Hi = 0
Lo = 0
speed = 500
pins.analog_write_pin(AnalogPin.P0, 512)
pins.analog_set_period(AnalogPin.P0, 100)
Lo = 0
Hi = 0
pins.set_events(DigitalPin.P2, PinEventType.PULSE)
serial.write_line("**MicroBit test***")
serial.write_string(">")

def on_forever():
    global comStr, comArr, i
    comStr = serial.read_until(serial.delimiters(Delimiters.CARRIAGE_RETURN))
    comArr = comStr.split(" ")
    if comArr[0] == "?":
        serial.write_line("Command help-------")
        serial.write_line("x:Motor cont stat")
        serial.write_line("test [p1 p2 ..]:parameter test")
        serial.write_line("-----------Ver0.1--")
    if comArr[0] == "x":
        serial.write_numbers([speed, Hi, Lo, Hi / (Hi + Lo)])
    if comArr[0] == "test":
        serial.write_line(comStr)
        i = 0
        while i < len(comArr):
            serial.write_line("" + (comArr[i]))
            i += 1
    serial.write_line("")
    serial.write_string(">")
basic.forever(on_forever)

def on_forever2():
    global speed
    if input.button_is_pressed(Button.A):
        speed += 10
    if input.button_is_pressed(Button.B):
        speed += -10
    if speed > 1000:
        speed = 1000
    if speed < 0:
        speed = 0
    pins.analog_write_pin(AnalogPin.P0, speed)
    basic.pause(100)
basic.forever(on_forever2)
