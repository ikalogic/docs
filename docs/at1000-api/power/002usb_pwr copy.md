---
id: usb_pwr
title: USB power supply
sidebar_position: 1
---



# USB Port Power Management

The **AT1000** provides control over its **two USB 3.0 ports**, allowing engineers to **power cycle devices under test (DUTs)** and measure **current and voltage consumption**.

:::info USB communication

While this chapter focuses on USB power management, the USB ports can be used to communicate with the DUT, or can even be used to interface other test or programming interfaces.

:::

## **USB Power Control**

Each USB port can be individually **powered up or down**. This allows for controlled testing of USB-powered devices.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
// Power up USB port 1
tester.usb(1).power_up();

// Power down USB port 1
tester.usb(1).power_down();
```

</TabItem>
<TabItem value="py" label="Python">

```python
# Power up USB port 1
tester.usb(1).power_up()

# Power down USB port 1
tester.usb(1).power_down()
```

</TabItem>
</Tabs>

## **Reading USB Voltage and Current**

The **AT1000** allows real-time measurement of **voltage and current** supplied to a USB-powered device.

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
// Read voltage on USB port 1 (on master AT1000 tester, i.e. rank 0)
let voltage = tester.usb(1,0).read_voltage();
console.log("USB Port 1 Voltage:", voltage, "V");

// Read current on USB port 1 (on master AT1000 tester, i.e. rank 0)
let current = tester.usb(1).read_current();
console.log("USB Port 1 Current:", current, "A");
```

</TabItem>
<TabItem value="py" label="Python">

```python
# Read voltage on USB port 1 (on master AT1000 tester, i.e. rank 0)
voltage = tester.usb(1, 0).read_voltage()
print(f"USB Port 1 Voltage: {voltage} V")

# Read current on USB port 1  (on master AT1000 tester, i.e. rank 0)
current = tester.usb(1, 0).read_current()
print(f"USB Port 1 Current: {current} A")
```

</TabItem>
</Tabs>

## **Summary**

The AT1000’s USB power management API enables:
- **Power cycling** USB devices via `power_up()` and `power_down()`.
- **Voltage and current measurement** for device power analysis.

These features allow engineers to perform **controlled power tests** on USB-powered devices.
