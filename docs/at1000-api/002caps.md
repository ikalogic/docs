---
id: device-capabilities
title: Device capabilities
sidebar_position: 2
---

# Device Capabilities

The **AT1000 Series** consists of multiple **test sequencer devices**, each with its own set of capabilities. Currently, the **AT1032S** is the only available model, but future models will be introduced with varying features. Understanding a device’s capabilities is essential for configuring test sequences effectively.

## **Retrieving Device Capabilities**
Users can retrieve the capabilities of an AT1000 device by querying its specifications. Each device provides a structured set of attributes, defining its hardware limits and supported features.

### **Capability Structure**
Every AT1000 device exposes a structured object containing the following fields:

| Capability      | Description |
|----------------|-------------|
| **name** | Device name, like "AT1032S" |
| **serial_number** | Unique identifier of the device |
| **io_count** | Number of available general-purpose I/Os |
| **output_voltage** | Voltage output range (min/max) |
| **input_voltage** | Voltage input range (min/max) |
| **dry_contacts** | Number of available dry relay contacts |
| **usb_ports** | Number of available USB power ports |
| **power_supply** | Programmable power supply specifications (max/min voltage & max current) |

### **Example Capability Structure for AT1032S**
Below is an example of the **capabilities object** returned for the **AT1032S**:

```json
{
  "name": "AT1032S",  
  "serial_number": "AT1032S-00123456",
  "io_count": 32,
  "output_voltage": { "max": 25, "min": 0 },
  "input_voltage": { "max": 25, "min": -25 },
  "dry_contacts": 8,
  "usb_ports": 2,
  "power_supply": { "max_voltage": 24, "min_voltage": 1.5, "max_current": 2.0 }
}
```

## **How to Query Capabilities in Code**
Users can programmatically retrieve device capabilities using the API. Below are examples in both **Node.js** and **Python**.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
const at1000 = require("at1000-node");
let tester = at1000.open("AT1032S");

// Retrieve device capabilities
let capabilities = tester.get_capabilities();
console.log("Device Capabilities:", capabilities);
```

</TabItem>
<TabItem value="py" label="Python">

```python
import at1000

tester = at1000.open("AT1032S")

# Retrieve device capabilities
capabilities = tester.get_capabilities()
print("Device Capabilities:", capabilities)
```

</TabItem>
</Tabs>

## **Why Checking Capabilities is Important**
- **Future-Proofing:** New AT1000 models may have different specifications.
- **Preventing Errors:** Ensures your test sequence doesn’t exceed device limits.
- **Optimizing Tests:** Use the correct power supply, I/O, and voltage ranges for your DUT.

By retrieving device capabilities dynamically, users can write scripts that **adapt to different AT1000 models** without requiring hardcoded values.