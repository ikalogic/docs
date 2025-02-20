---
title: Structures, Enums, and Defines
sidebar_position: 1
---
# SP1000G API Types and Structures

This document provides detailed information on the enumerations, structures, and macros used in the **SP1000G API**.

## **Defined Constants**

| Name | Value | Description |
|------|-------|-------------|
| `SP1000G_GROUPS_COUNT` | 3 | Number of groups in the device |
| `SP1000G_CHANNELS_COUNT` | 54 | Maximum number of channels |
| `SP1000G_TRIG_ENGINES_COUNT` | 2 | Number of trigger engines |
| `SP1000G_THRESHOLDS_COUNT` | 6 | Number of supported threshold levels |
| `SP1000G_MAX_TRIG_STEPS_COUNT` | 256 | Maximum trigger steps |
| `SP1000G_OCI_CLOCK_COUNT` | 2 | Number of OCI clocks available |

## **Enumerations**

### `sp1000gapi_model_t`
Defines the supported SP1000G models.

```cpp
enum sp1000gapi_model_t {
    sp1018g = 1018,  ///< 18-channel model
    sp1036g = 1036,  ///< 36-channel model
    sp1054g = 1054   ///< 54-channel model
};
```

### `sp1000gapi_pull_t`
Defines the pull-up or pull-down configuration.

```cpp
enum sp1000gapi_pull_t {
    SP1000GAPI_PULL_DOWN = 0,  ///< Pull-down resistor enabled
    SP1000GAPI_PULL_UP = 1     ///< Pull-up resistor enabled
};
```

### `sp1000gapi_io_type_t`
Defines the I/O configuration type.

```cpp
enum sp1000gapi_io_type_t {
    SP1000GAPI_IO_IN = 0,  ///< Input mode
    SP1000GAPI_IO_PP = 1,  ///< Push-pull output mode
    SP1000GAPI_IO_OD = 2   ///< Open-drain output mode
};
```

### `sp1000gapi_state_clk_mode_t`
Defines the clock mode used in state capture.

```cpp
enum sp1000gapi_state_clk_mode_t {
    SCLK_DISABLE = 0,  ///< State clock disabled
    SCLK_RISING = 1,   ///< Rising edge
    SCLK_FALLING = 2,  ///< Falling edge
    SCLK_DUAL = 3      ///< Dual edge (both rising and falling)
};
```

### `sp1000gapi_trigger_type_t`
Defines the different types of triggers supported.

```cpp
enum sp1000gapi_trigger_type_t {
    SP1000GAPI_TRG_NOTRIG = 99,  ///< No trigger
    SP1000GAPI_TRG_RISING = 1,   ///< Rising edge
    SP1000GAPI_TRG_FALLING = 0,  ///< Falling edge
    SP1000GAPI_TRG_CHANGE = 3,   ///< Any change in logic state
    SP1000GAPI_TRG_EXT_RISING = 0x1F, ///< External rising edge trigger
    SP1000GAPI_TRG_EXT_FALLING = 0x0F ///< External falling edge trigger
};
```

## **Structures**

### `sp1000gapi_trigger_description_t`
Describes a trigger configuration.

```cpp
struct sp1000gapi_trigger_description_t {
    sp1000gapi_trigger_type_t type;  ///< Trigger type (e.g., rising, falling, etc.)
    int8_t channel;  ///< Channel index, or -1 for all channels (only valid for logic change trigger)
};
```

### `sp1000gapi_settings_t`
Contains the settings for device configuration.

```cpp
struct sp1000gapi_settings_t {
    int64_t sampling_depth;  ///< Total number of samples requested
    int64_t post_trig_depth;  ///< Number of samples after the trigger
    uint32_t s_clk;  ///< Sampling clock in Hz
    uint32_t t_clk[SP1000G_TRIG_ENGINES_COUNT];  ///< Trigger clock frequencies
    uint16_t thresh_capture_mv[SP1000G_THRESHOLDS_COUNT];  ///< Capture voltage thresholds (mV)
    uint16_t vcc_gen_mv[SP1000G_THRESHOLDS_COUNT];  ///< Target VCC voltages (mV)
    sp1000gapi_io_type_t io_type[SP1000G_CHANNELS_COUNT];  ///< I/O type per channel
    sp1000gapi_pull_t io_pull[SP1000G_CHANNELS_COUNT];  ///< Pull-up/down settings per channel
    sp1000gapi_state_clk_mode_t state_clk_mode;  ///< State clock mode
    sp1000gapi_state_clk_source_t state_clk_src;  ///< State clock source selection
    sp1000gapi_timebase_clk_t timebase_src;  ///< Timebase source selection
    bool ext_trig_50r;  ///< Enable 50Ω termination for external trigger input
    uint16_t ext_in_threshold_mv;  ///< External trigger input threshold (mV)
    bool ext_trig_out_polarity;  ///< Polarity of external trigger output
    uint8_t trig_order;  ///< Trigger engine sequence order (00, 01, 10, or 11)
    bool oci_clk_out_enable[SP1000G_GROUPS_COUNT][SP1000G_OCI_CLOCK_COUNT];  ///< Enable OCI clock output
    uint64_t oci_clk_out_freq[SP1000G_GROUPS_COUNT][SP1000G_OCI_CLOCK_COUNT];  ///< OCI clock frequency
};
```

### `sp1000gapi_trs_t`
Defines a transition event in the captured data.

```cpp
struct sp1000gapi_trs_t {
    uint8_t value;  ///< Captured logic value
    uint64_t sampple_index;  ///< Sample index associated with the transition
};
```

## **Trigger Order Encoding**

The **trig_order** field in `sp1000gapi_settings_t` encodes the behavior of the dual trigger engine:

| Value (Binary) | Description |
|---------------|-------------|
| `00` | Trigger 0 or Trigger 1 (any of the two will activate the trigger) |
| `01` | Trigger 0 then Trigger 1 (Trigger 1 is only enabled after Trigger 0 occurs) |
| `10` | Trigger 1 then Trigger 0 (Trigger 0 is only enabled after Trigger 1 occurs) |
| `11` | Trigger 0 and Trigger 1, in any order |

## **Conclusion**

This document provides a structured overview of the **SP1000G API** structures, enumerations, and macros. These definitions form the core of the API and are necessary for configuring and controlling the device.

