---
id: digital-io
title: Digital I/O Operations
sidebar_position: 2
---

# Digital I/O Operations
AT1000 device has 32 Inputs/outputs (which may be further extended by daisy-chaining multiple devices). Any of those I/Os can be configured as Analog or Digital, independently from the other I/Os. This chapter focuses on the digital mode of operation.


## Configuring Digital I/O

The following code snipped shows how to declare I/Os as digital, and use them as inputs or outputs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
var test_pin5 = tester.digital_io(5, 0); // GPIO 5 on master device
var test_pin6 = tester.digital_io(6, 0); // GPIO 5 on master device
test_pin5.config_input(3.3, 0.8); // VIH = 3.3V, VIL = 0.8V
test_pin6.config_output(6, 0, false); // VOH = 5V, VOL = 0V, Default: Low
```



</TabItem>
<TabItem value="py" label="Python">

```python
var test_pin5 = tester.digital_io(5, 0); // GPIO 5 on master device
var test_pin6 = tester.digital_io(6, 0); // GPIO 5 on master device
test_pin5.config_input(3.3, 0.8); // VIH = 3.3V, VIL = 0.8V
test_pin6.config_output(6, 0, false); // VOH = 5V, VOL = 0V, Default: Low
```

</TabItem>
</Tabs>


Let's break the code into detailed steps:

`tester.digital_io(5, 0)` initializes GPIO 5 on the master AT1000 device (rank 0) as a digital I/O pin.

The function `digital_io(gpio_number, device_rank)` allows selecting a specific GPIO pin on a specific device in a daisy-chain setup.
5 refers to GPIO 5, and 0 refers to the master device. if you needed to refer to the first slave in a daisy-chain, rank would be "0".

Then, the function `config_input(3.3, 0.8)` configures a digital I/O as an input by giving two thresholds : 
* VIH (Voltage Input High) = 3.3V (any voltage above this is read as HIGH).
* VIL (Voltage Input Low) = 0.8V (any voltage below this is read as LOW).

This setup ensures the AT1000 correctly interprets the input signals based on expected voltage levels. 

`digital_io(6, 0)` initializes GPIO 6 on the master AT1000 device as a digital I/O pin.
Similar to the previous line, 6 refers to GPIO 6, and 0 refers to the master device.

The function `config_output(5.1, 0, false)` This configures GPIO 6 as an output.
The parameters define the output voltage characteristics:
* VOH (Voltage Output High) = 5.1V (when the output is set to HIGH, it will output 5.1V).
* VOL (Voltage Output Low) = 0V (when the output is set to LOW, it will output 0V).
* Default state = false (LOW) (when the AT1000 starts, this pin will be LOW by default).
This ensures that GPIO 6 is properly set as a digital output pin with controlled voltage levels.

:::tip Tip
The last parameter of `config_output(5.1, 0, false)`  (`false`) is a logic level.
:::



## Reading digital inputs

To read the digital value of an input that was properly configured simply use the function `read()` which will return 0 or 1 depending on the logic level that is calculated according to the VIH and VIL thresholds.

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let test_pin5 = tester.digital_io(5, 0); // GPIO 5 on master device
test_pin5.config_input(3.3, 0.8); // VIH = 3.3V, VIL = 0.8V
let value = test_pin5.read(); // Read the current value of GPIO 5
```



</TabItem>
<TabItem value="py" label="Python">

```python
test_pin5 = tester.digital_io(5, 0)  # GPIO 5, rank 0 (master device)
test_pin5.config_input(3.3, 0.8) # VIH = 3.3V, VIL = 0.8V
value = test_pin5.read() # Read the current value of GPIO 5

```

</TabItem>
</Tabs>


## Writing to Digital Outputs

To control the output state of a GPIO pin that has been properly configured as an output, use the `write(value)` function. The function takes a single argument (`0` or `1`), which determines whether the pin outputs a **low voltage (VOL)** or a **high voltage (VOH)** as previously defined during configuration.


<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let test_pin6 = tester.digital_io(6, 0); // GPIO 6 on master device
test_pin6.config_output(5, 0, 0); // VOH = 5V, VOL = 0V, Default = 0V (LOW)
test_pin6.write(1); // Set GPIO 6 to HIGH (5V)
```

</TabItem>
<TabItem value="py" label="Python">

```python
test_pin6 = tester.digital_io(6, 0)  # GPIO 6, rank 0 (master device)
test_pin6.config_output(5, 0, 0)  # VOH = 5V, VOL = 0V, Default = 0V (LOW)
test_pin6.write(1)  # Set GPIO 6 to HIGH (5V)
```

</TabItem>
</Tabs>