---
id: dut_pwr
title: DUT power supply
sidebar_position: 1
---



# DUT power management

The **AT1000** features a **DUT power port** capable of delivering **up to 24V**, allowing engineers to **supply, control, and monitor power** to their devices under test (DUTs).

In many application, current consumption can be correlated to device behavior, and can be used to confirm normal operation or detect abnormal operation.

In some situation power-cycling a port in a controlled manner is key to thoroughly testing a device.

## **Controlling DUT Power**

The **DUT power port** can be powered up to a specified voltage and powered down when needed.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript


// Power up DUT port on master AT1000 tester (device rank = 0) with a voltage of 12V
tester.dut_pwr(0).power_up(12);

// Power down the DUT power port
tester.dut_pwr(0).power_down();
```

</TabItem>
<TabItem value="py" label="Python">

```python


# Power up DUT port on master AT1000 tester (device rank = 0) with a voltage of 12V
tester.dut_pwr(0).power_up(12)

# Power down the DUT power port
tester.dut_pwr(0).power_down()
```

</TabItem>
</Tabs>

## **Reading DUT Voltage and Current**

The **AT1000** allows real-time measurement of **voltage and current** supplied to the DUT.

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript


// Read voltage supplied to DUT
let voltage = tester.dut_pwr().read_voltage();
console.log("DUT Power Voltage:", voltage, "V");

// Read current consumption of DUT
let current = tester.dut_pwr().read_current();
console.log("DUT Power Current:", current, "A");
```

</TabItem>
<TabItem value="py" label="Python">

```python


# Read voltage supplied to DUT
voltage = tester.dut_pwr().read_voltage()
print(f"DUT Power Voltage: {voltage} V")

# Read current consumption of DUT
current = tester.dut_pwr().read_current()
print(f"DUT Power Current: {current} A")
```

</TabItem>
</Tabs>

## **Summary**

The AT1000’s **DUT power port API** enables:
- **Powering up DUTs** with a programmable voltage from **0 to 24V**.
- **Power cycling** DUTs via `power_up(voltage)` and `power_down()`.
- **Voltage and current measurement** for real-time monitoring.

These features provide **precise power control** for automated **DUT testing**.