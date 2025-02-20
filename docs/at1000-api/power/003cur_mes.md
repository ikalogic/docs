---
id: cur_mes
title: Precision current measurement
sidebar_position: 1
---




# Precision current measurement

The **AT1000** provides **bidirectional current measurement** on **relay 4**, allowing engineers to measure **current flow in both directions** with 1uA resolution.

:::info Current Measurement and resolution

Current measurement is done by measuring the voltage drop across a small value resistor called a shunt. In order to achieve 1uA resolution, a shunt resistor of 0.33 Ohm is used. The maximum measurable current is 500 mA. Beyond this value, the system will continue to operate normally but current readings will saturate.

Please refer to the product datasheet for more details.

:::

## **Reading Current on Relay 4**

The `read_current()` function retrieves the measured **bidirectional current**. If called on **any relay other than relay 4**, an error will be raised.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript


// Read current on relay 4 (supports bidirectional current measurement)
let current = tester.relay(4).read_current();
console.log("Relay 4 Current:", current, "A");
```

</TabItem>
<TabItem value="py" label="Python">

```python
# Read current on relay 4 (supports bidirectional current measurement)
current = tester.relay(4).read_current()
print(f"Relay 4 Current: {current} A")
```

</TabItem>
</Tabs>

