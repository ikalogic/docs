---
id: relay
title: Relay / Dry Contacts Control
sidebar_position: 5
---



# Controlling Relays and Dry Contacts

The AT1000 provides **8 dry contact relays** per device, which can be controlled individually or all at once. Each relay is addressed by its **number (0-7)** and the **rank of the AT1000 device** in a daisy-chain configuration. The **rank 0** refers to the master device.

## Closing and Opening Relays

The `relay()` function requires two parameters:
- **Relay number (0-7)**: The specific relay on the AT1000 device.
- **Device rank**: The rank of the AT1000 in a daisy-chained setup (0 for the master, 1 for the first slave, etc.).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let relay4 = tester.relay(4, 0); // Select relay number 4 on the master device
relay4.close(); // Close relay 4 (activate)
relay4.open();  // Open relay 4 (deactivate)

// Control all relays at once
tester.relay().close();
```

</TabItem>
<TabItem value="py" label="Python">

```python
relay4 = tester.relay(4, 0)  # Select relay number 4 on the master device
relay4.close()  # Close relay 4 (activate)
relay4.open()  # Open relay 4 (deactivate)

# Control all relays at once
tester.relay().close()  
```

</TabItem>
</Tabs>

# Reading Relay Status

To check whether a relay is open or closed, use the `read()` function, passing both the **relay number** and the **device rank**. If the `read()` function return 1, it means the relay is closed.

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let relay_status = tester.relay(4, 0).read(); // Read the status of relay 4 on master device
console.log("Relay 4 status on master:", relay_status ? "Closed" : "Open");
```

</TabItem>
<TabItem value="py" label="Python">

```python
relay_status = tester.relay(4, 0).read()  # Read the status of relay 4 on master device
print(f"Relay 4 status on master: {'Closed' if relay_status else 'Open'}")
```

</TabItem>
</Tabs>


:::caution Relays / Dry contacts are not synchronized

Please note that relays operation are always sequential, and cannot be synchronized using the `hold` and `sync` mechanisms. 

:::