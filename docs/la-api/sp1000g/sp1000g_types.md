---
title: Structures, Enums, and Defines
sidebar_position: 1
---
# SP1000G API Types and Structures

This document provides detailed information on the enumerations, structures, and macros used in the **SP1000G API**.

## Defines

The following defines are set based on the device:

### For SP1018G
- **SP1000G_GROUPS_COUNT:** 1  
- **SP1000G_CHANNELS_COUNT:** 18  
- **SP1000G_TRIG_ENGINES_COUNT:** 2  
- **SP1000G_THRESHOLDS_COUNT:** 2  
- **SP1000G_MAX_TRIG_STEPS_COUNT:** 256  
- **SP1000G_OCI_CLOCK_COUNT:** 2  

### For SP1036G
- **SP1000G_GROUPS_COUNT:** 2  
- **SP1000G_CHANNELS_COUNT:** 36  
- **SP1000G_TRIG_ENGINES_COUNT:** 2  
- **SP1000G_THRESHOLDS_COUNT:** 4  
- **SP1000G_MAX_TRIG_STEPS_COUNT:** 256  
- **SP1000G_OCI_CLOCK_COUNT:** 2  

### For SP1054G
- **SP1000G_GROUPS_COUNT:** 3  
- **SP1000G_CHANNELS_COUNT:** 54  
- **SP1000G_TRIG_ENGINES_COUNT:** 2  
- **SP1000G_THRESHOLDS_COUNT:** 6  
- **SP1000G_MAX_TRIG_STEPS_COUNT:** 256  
- **SP1000G_OCI_CLOCK_COUNT:** 2  


## Enumerations

### sp1000gapi_model_t
Specifies the model of the SP1000G device.
- **sp1018g:** 1018  
- **sp1036g:** 1036  
- **sp1054g:** 1054  

### sp1000gapi_pull_t
Defines the pull resistor configuration for I/O channels.
- **SP1000GAPI_PULL_DOWN:** 0  
- **SP1000GAPI_PULL_UP:** 1  

### sp1000gapi_io_type_t
Specifies the I/O type.
- **SP1000GAPI_IO_IN:** 0  (Input)
- **SP1000GAPI_IO_PP:** 1  (Push-Pull)
- **SP1000GAPI_IO_OD:** 2  (Open Drain)

### sp1000gapi_state_clk_mode_t
Describes the state clock mode.
- **SCLK_DISABLE:** 0  
- **SCLK_RISING:** 1  (Rising edge)
- **SCLK_FALLING:** 2  (Falling edge)
- **SCLK_DUAL:** 3  (Dual edge – triggers on both rising and falling edges)

### sp1000gapi_state_clk_source_t
Specifies the source channel for the state clock.
- **SCLK_CH9:** 0  
- **SCLK_CH18:** 1  

### sp1000gapi_timebase_clk_t
Defines the timebase clock source.
- **TIMEBASE_INTERNAL:** 3  
- **TIMEBASE_EXTERNAL:** 2  

### sp1000gapi_trigger_type_t
Lists the different trigger types supported by the API.
- **SP1000GAPI_TRG_NOTRIG:** 99  
- **SP1000GAPI_TRG_RISING:** 1  (Rising edge trigger; do not change this value)
- **SP1000GAPI_TRG_FALLING:** 0  (Falling edge trigger; do not change this value)
- **SP1000GAPI_TRG_CHANGE:** 3  (Logic change trigger)
- **SP1000GAPI_TRG_EXT_RISING:** 0x1F  (External rising edge trigger; do not change this value)
- **SP1000GAPI_TRG_EXT_FALLING:** 0x0F  (External falling edge trigger; do not change this value)

## Structures

### sp1000gapi_trigger_description_t
Describes a trigger configuration.
- **type:** `sp1000gapi_trigger_type_t`  
  The type of trigger (e.g., falling edge, rising edge, or logic change).

- **channel:** `int8_t`  
  The channel number affected by the trigger. Set to `-1` if targeting all channels (only valid for logic change triggers). The channel is 0-indexed (first channel is 0).

### sp1000gapi_settings_t
Holds configuration settings for a capture session.
- **sampling_depth:** `int64_t`  
  Total number of samples requested by the user.

- **post_trig_depth:** `int64_t`  
  Total number of samples to be captured after the trigger.

- **s_clk:** `uint32_t`  
  Sampling clock frequency in Hertz.

- **t_clk:** `uint32_t[SP1000G_TRIG_ENGINES_COUNT]`  
  Array of trigger clock frequencies in Hertz.  
  *Note:* The number of entries is defined by `SP1000G_TRIG_ENGINES_COUNT`.

- **thresh_capture_mv:** `uint16_t[SP1000G_THRESHOLDS_COUNT]`  
  Array of thresholds (in millivolts) used during capture.  
  *Warning:* This is not the target VCC, but the threshold level.

- **vcc_gen_mv:** `uint16_t[SP1000G_THRESHOLDS_COUNT]`  
  Array of target VCC values (in millivolts).  
  *Warning:* This is not the threshold, but the target VCC.

- **io_type:** `sp1000gapi_io_type_t[SP1000G_CHANNELS_COUNT]`  
  Array specifying the I/O type for each channel.

- **io_pull:** `sp1000gapi_pull_t[SP1000G_CHANNELS_COUNT]`  
  Array specifying the pull resistor configuration for each channel.

- **state_clk_mode:** `sp1000gapi_state_clk_mode_t`  
  Configures the external (state) clock mode, indicating the edge triggering behavior.

- **state_clk_src:** `sp1000gapi_state_clk_source_t`  
  Specifies the channel used as the source for the state clock.

- **timebase_src:** `sp1000gapi_timebase_clk_t`  
  Specifies the source of the timebase clock.

- **ext_trig_50r:** `bool`  
  Activates the 50-ohm resistor on the external trigger input.

- **ext_in_threshold_mv:** `uint16_t`  
  External input threshold expressed in millivolts.

- **ext_trig_out_polarity:** `bool`  
  Polarity of the external trigger output.

- **trig_order:** `uint8_t`  
  A 2-bit value describing the operation order of the dual trigger engine:
  - `00`: Either Trigger 0 or Trigger 1 will cause the capture.
  - `01`: Trigger 0 then Trigger 1 (Trigger 1 is enabled only after Trigger 0 occurs).
  - `10`: Trigger 1 then Trigger 0 (Trigger 0 is enabled only after Trigger 1 occurs).
  - `11`: Both Trigger 0 and Trigger 1 are active, regardless of order.

- **oci_clk_out_enable:** `bool[SP1000G_GROUPS_COUNT][SP1000G_OCI_CLOCK_COUNT]`  
  2D array that enables OCI clock output for each group and clock channel.

- **oci_clk_out_freq:** `uint64_t[SP1000G_GROUPS_COUNT][SP1000G_OCI_CLOCK_COUNT]`  
  2D array specifying the frequency of the OCI clock outputs for each group and clock channel.

### sp1000gapi_trs_t
Describes a transition in the captured data.
- **value:** `uint8_t`  
  The logic level of the line during the transition.

- **sampple_index:** `uint64_t`  
  The sample index associated with the transition.  
  *Note:* There is a typographical error in the field name ("sampple_index") which likely should be "sample_index".
