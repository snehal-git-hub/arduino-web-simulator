let state = {
  arduino: false,
  ledPin: null,
  buttonPin: null,
  usedPins: new Set(),
  buttonState: 0
};

const DIGITAL_PINS = ["D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13"];
function getFreePin() {
  for (let pin of DIGITAL_PINS) {
    if (!state.usedPins.has(pin)) return pin;
  }
  return null;
}
function addArduino() {
  if (state.arduino) return alert("Arduino already added");
  state.arduino = true;

  let div = document.createElement("div");
  div.className = "component";
  div.innerText = "Arduino UNO";
  workspace.appendChild(div);
}
function addLED() {
  if (!state.arduino) return alert("Add Arduino first");
  if (state.ledPin) return alert("LED already added");

  let pin = getFreePin();
  if (!pin) return alert("No free pins");

  state.ledPin = pin;
  state.usedPins.add(pin);

  let div = document.createElement("div");
  div.className = "component";
  div.innerText = `LED → ${pin}`;
  div.id = "led";
  workspace.appendChild(div);

  generateCode();
}
function addButton() {
  if (!state.arduino) return alert("Add Arduino first");
  if (state.buttonPin) return alert("Button already added");

  let pin = getFreePin();
  if (!pin) return alert("No free pins");

  state.buttonPin = pin;
  state.usedPins.add(pin);

  let div = document.createElement("div");
  div.className = "component";
  div.innerHTML = `Button → ${pin} <button onclick="toggleButton()">Press</button>`;
  div.id = "button";
  workspace.appendChild(div);

  generateCode();
}
function toggleButton() {
  state.buttonState = state.buttonState ? 0 : 1;

  let led = document.getElementById("led");
  if (state.buttonState)
    led.style.background = "yellow";
  else
    led.style.background = "white";
}
function generateCode() {
  if (!state.ledPin || !state.buttonPin) return;

  document.getElementById("code").innerText =
`int ledPin = ${state.ledPin.substring(1)};
int buttonPin = ${state.buttonPin.substring(1)};

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  digitalWrite(ledPin, buttonState);
}`;
}
