---
id: industrial
title: Industrial interfaces
sidebar_position: 6
---



# Controlling CAN, RS232 and RS485 ports

The **AT1000** features multiple **industrial communication interfaces**, including:
- **1 CAN bus**
- **2 RS485 buses**
- **2 RS232 buses**

## **Multiplexing Considerations**

Some interfaces share GPIOs, meaning only **one** can be enabled at a given time:
- **CAN bus and RS485_1** share the same GPIOs:  
  - **CANH / RS485_1 (A) → GPIO25**  
  - **CANL / RS485_1 (B) → GPIO26**
- **RS485_2** is mapped to:
  - **RS485_2 (A) → GPIO28**
  - **RS485_2 (B) → GPIO27**

- **RS232 buses have a dedicated connector on the front panel**

Additionally:
- **RS232 and RS485 internally share the same UARTs ports**, meaning that:
  - You **can** enable `RS232_1` and `RS485_2` together.
  - You **can** enable `RS232_2` and `RS485_1` together.  
  - You **cannot** enable `RS232_1` and `RS485_1` at the same time.
  - You **cannot** enable `RS232_2` and `RS485_2` at the same time.


### Summary of Shared GPIOs and UARTs

| Interface  | Shared GPIOs / UARTs  | Notes |
|------------|----------------------|-------|
| **CAN Bus**  | Shares GPIOs with **RS485_1**  | Only **one** can be enabled at a time |
| **RS485_1**  | Shares GPIOs with **CAN Bus**  | Only **one** can be enabled at a time |
| **RS485_2**  | Dedicated GPIOs (GPIO28 & GPIO27) | No conflict with other GPIOs |
| **RS232_1**  | Shares UART with **RS485_1** | Cannot enable **both** at the same time |
| **RS232_2**  | Shares UART with **RS485_2** | Cannot enable **both** at the same time |


:::tip User friendly multiplexing!

In order to avoid any confusion, we recommend following this standard procedure when using an industrial communication port:

1. Start by enabling the port
2. Disable to port when done using it.

If there are any conflicts (e.g. enabling an interface before disabling another one that uses the same resources), an error will be raised during the `enable()` phase, allowing you to easily detect and correct any conflicts.

:::

## **CAN Bus API**

The **CAN bus** supports enabling/disabling, termination resistance, setting message acceptance filters, transmitting, and receiving data.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
const at1000 = require("at1000");
let devices = at1000.find_devices(5); // Find devices with a 5s timeout
let tester = devices[0]; // Target the first detected device

// Enable CAN bus on AT1000 master (rank 0)
tester.can(0).enable();

// Enable 100Ω differential termination resistor
tester.can().set_term(true);

// Set CAN receive filter (mask: 0xFF9F, filter: 0x25A)
tester.can().set_rx_filter(0xFF9F, 0x25A);

// Start receiving CAN messages
tester.can().start_rx();

// Transmit a CAN message
tester.can().tx(0x123, [0x11, 0x22, 0x33, 0x44]);

// Receive messages (returns an array of objects containing ID & data)
let data_rx = tester.can().rx();

// Print received messages
data_rx.forEach(msg => {
    console.log(`CAN Message ID: ${msg.id}, Data: ${msg.data}`);
});

// Disable CAN bus on AT1000 master
tester.can(0).disable();
```

</TabItem>
<TabItem value="py" label="Python">

```python
import at1000

devices = at1000.find_devices(5)  # Find devices with a 5s timeout
tester = devices[0]  # Target the first detected device

# Enable CAN bus on AT1000 master (rank 0)
tester.can(0).enable()

# Enable 100Ω differential termination resistor
tester.can().set_term(True)

# Set CAN receive filter (mask: 0xFF9F, filter: 0x25A)
tester.can().set_rx_filter(0xFF9F, 0x25A)

# Start receiving CAN messages
tester.can().start_rx()

# Transmit a CAN message
tester.can().tx(0x123, [0x11, 0x22, 0x33, 0x44])

# Receive messages (returns an array of objects containing ID & data)
data_rx = tester.can().rx()

# Print received messages
for msg in data_rx:
    print(f"CAN Message ID: {msg.id}, Data: {msg.data}")

# Disable CAN bus on AT1000 master
tester.can(0).disable()
```

</TabItem>
</Tabs>

## **RS485 Bus API**

The **RS485 bus** supports enabling/disabling, termination resistance, transmitting, and receiving data.

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
const at1000 = require("at1000");
let devices = at1000.find_devices(5); 
let tester = devices[0]; 

// Enable RS485_2 bus on AT1000 master (rank 0)
tester.rs485(1, 0).enable(true);

// Enable 100Ω differential termination resistor
tester.rs485(1, 0).enable_term(true);

// Start receiving RS485 messages
tester.rs485(1, 0).start_rx();

// Transmit a message over RS485
tester.rs485(1, 0).tx([0xDE, 0xAD, 0xBE, 0xEF]);

// Receive data (returns an array of bytes)
let data_rx = tester.rs485(1, 0).rx();

// Print received bytes
console.log("RS485 Data Received:", data_rx);

// Disable RS485_2 bus
tester.rs485(1, 0).disable();
```

</TabItem>
<TabItem value="py" label="Python">

```python
import at1000

devices = at1000.find_devices(5)
tester = devices[0]

# Enable RS485_2 bus on AT1000 master (rank 0)
tester.rs485(1, 0).enable(True)

# Enable 100Ω differential termination resistor
tester.rs485(1, 0).enable_term(True)

# Start receiving RS485 messages
tester.rs485(1, 0).start_rx()

# Transmit a message over RS485
tester.rs485(1, 0).tx([0xDE, 0xAD, 0xBE, 0xEF])

# Receive data (returns an array of bytes)
data_rx = tester.rs485(1, 0).rx()

# Print received bytes
print(f"RS485 Data Received: {data_rx}")

# Disable RS485_2 bus
tester.rs485(1, 0).disable()
```

</TabItem>
</Tabs>

## **RS232 Bus API**

The **RS232 bus** operates similarly to RS485 (except it does **not require termination resistors**).

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
const at1000 = require("at1000");
let tester = at1000.open();

// Enable RS232_1 on AT1000 master
tester.rs232(1, 0).enable();

// Start receiving RS232 messages
tester.rs232(1, 0).start_rx();

// Transmit a message over RS232
tester.rs232(1, 0).tx("Hello AT1000");

// Receive data (returns a string)
let data_rx = tester.rs232(1, 0).rx();

// Print received message
console.log("RS232 Data Received:", data_rx);

// Disable RS232_1 bus
tester.rs232(1, 0).disable();
```

</TabItem>
<TabItem value="py" label="Python">

```python
import at1000

tester = at1000.open()

# Enable RS232_1 on AT1000 master
tester.rs232(1, 0).enable()

# Start receiving RS232 messages
tester.rs232(1, 0).start_rx()

# Transmit a message over RS232
tester.rs232(1, 0).tx("Hello AT1000")

# Receive data (returns a string)
data_rx = tester.rs232(1, 0).rx()

# Print received message
print(f"RS232 Data Received: {data_rx}")

# Disable RS232_1 bus
tester.rs232(1, 0).disable()
```

</TabItem>
</Tabs>

## **Summary**

The AT1000 provides CAN bus, RS485 buses and RS232buses with advanced control features.

These interfaces allow **flexible testing of communication ports** with error handling for invalid configurations.
