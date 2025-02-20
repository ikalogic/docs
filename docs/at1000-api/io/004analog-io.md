---
id: analog-io
title: Analog I/O Operations
sidebar_position: 3
---

# Analog I/O Operations
AT1000 device has 32 Inputs/outputs (which may be further extended by daisy-chaining). Any of those I/Os can be configured as Analog or Digital, independently from the other I/Os. This chapter focuses on the analog mode of operation.

## Configuring Analog I/O

The following code snipped shows how to declare I/Os as analog mode and use them as inputs or outputs.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let test_pin3 = tester.analog_io(3, 0); // GPIO 3 on master (rank = 0)
let test_pin4 = tester.analog_io(4); // GPIO 4 on master (if ignored, rank is assumed to be 0)

test_pin3.config_input(); // Configure as input
test_pin4.config_output(2.5); // Default output = 2.5V
```

</TabItem>
<TabItem value="py" label="Python">

```python
# TODO!!!
let test_pin3 = tester.analog_io(3, 0); // GPIO 3 on master (rank = 0)
let test_pin4 = tester.analog_io(4); // GPIO 4 on master (if ignored, rank is assumed to be 0)

test_pin3.config_input(); // Configure as input
test_pin4.config_output(2.5); // Default output = 2.5V
```

</TabItem>
</Tabs>



Let's break this down to different steps:

`analog_io` method creates an analog Input/output object. It takes two parameters: 
* The number of the I/O (from 0 to 31)
* The rank of the device. If ignored, it defaults to 0, meaning the master device. In case of a simple test setup with only one device, the device rank can be set to 0 or simply left blank.

`test_pin3` is a analog I/O, it's configured as an input using the `config_input()` method.
`test_pin4` is configured as an analog output using the `config_output()` method. If no default output voltage is provided, 0.0V is assumed by default.


:::info AT1000 is sequential!
AT1000 and its API are designed to operate in a sequential fashion. Hence, a pin can be configured as an input, then it can be configured as output. The code will execute sequentially as it was written.
:::


## Reading analog input

To rea the analog value of an input that was properly configured, use the `read()` function. This will return a floating-point voltage value that represents the measured signal on the selected GPIO pin.



<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let analog_pin5 = tester.analog_io(5, 0); // GPIO 5 on master device
analog_pin5.config_input(); // Configure as analog input
let voltage = analog_pin5.read(); // Read the voltage on GPIO 5
```

</TabItem>
<TabItem value="py" label="Python">

```python
analog_pin5 = tester.analog_io(5, 0)  # GPIO 5, rank 0 (master device)
analog_pin5.config_input()  # Configure as analog input
voltage = analog_pin5.read()  # Read the voltage on GPIO 5
```

</TabItem>
</Tabs>


## Writing analog output

To generate an analog output signal on a configured GPIO pin, use the `write(value)` function. The function takes a voltage value (within the supported range) and sets the output to that level.

<Tabs>
<TabItem value="js" label="NodeJS">

```javascript
let analog_pin6 = tester.analog_io(6, 0); // GPIO 6 on master device
analog_pin6.config_output(2.5); // Default output voltage set to 2.5V
analog_pin6.write(12.9); // Set GPIO 6 to output 12.9V
```

</TabItem>
<TabItem value="py" label="Python">

```python
analog_pin6 = tester.analog_io(6, 0)  # GPIO 6, rank 0 (master device)
analog_pin6.config_output(2.5)  # Default output voltage set to 2.5V
analog_pin6.write(12.9)  # Set GPIO 6 to output 12.9V
```

</TabItem>
</Tabs>