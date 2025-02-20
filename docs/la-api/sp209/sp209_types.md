---
title: Structures, Enums, and Defines
sidebar_position: 1
---

# SP209 API Types and Structures

This document provides an overview of the key **structures, enums, and defines** used in the SP209 API.


## **Defines**

```cpp
#define SP209_CHANNELS_COUNT (9)       // Number of available channels
#define SP209_TRIG_ENGINES_COUNT (2)   // Number of trigger engines
#define SP209_THRESHOLDS_COUNT (3)     // Number of supported thresholds
#define SP209_MAX_TRIG_STEPS_COUNT (128) // Maximum trigger steps
```


## **Handle Definition**

```cpp
typedef void* sp209api_handle;
```

This handle is used to reference an active SP209 device session.


## **Enumerations**

### **Device Variants (`sp209api_variant_t`)**

Determines the firmware loaded when opening a device.

```cpp
enum sp209api_variant_t
{
    SP209API_VARIANT_STD = 0,   ///< Standard SP209 firmware
    SP209API_VARIANT_NEXUS = 1, ///< Custom firmware for Nexus bus analyzer
    SP209API_VARIANT_TPIU = 2,  ///< Custom firmware for TPIU bus analyzer
};
```

### **Clock Polarity (`sp209api_clock_pol_t`)**

Defines the polarity of the external clock if used.

```cpp
enum sp209api_clock_pol_t
{
    CLK_POL_RISING = 1,  ///< Rising edge
    CLK_POL_FALLING = 0, ///< Falling edge
    CLK_POL_DUAL = 2,    ///< Dual edge (rising or falling)
};
```

### **Device Models (`sp209api_device_model_t`)**

Defines different models in the SP209 family.

```cpp
enum sp209api_device_model_t
{
    SP209API_MODEL_NONE = 0,   ///< Should never be used.
    SP209API_MODEL_209 = 360,  ///< Standard SP209
    SP209API_MODEL_209I = 370, ///< Industrial SP209i
};
```

### **Threshold Levels (`sp209api_threshold_t`)**

Defines supported logic level thresholds.

```cpp
enum sp209api_threshold_t
{
    SP209API_TH_1V8 = 0,   ///< 1.8V logic level
    SP209API_X_TH_2V5 = 1, ///< 2.5V logic level
    SP209API_X_TH_3V3 = 2, ///< 3.3V logic level
    SP209API_TH_5V0 = 4,   ///< 5.0V logic level
};
```

### **Trigger Types (`sp209api_trigger_type_t`)**

Lists different kinds of triggers supported by the API.

```cpp
enum sp209api_trigger_type_t
{
    SP209API_TRG_NOTRIG = 0,
    SP209API_TRG_RISING,
    SP209API_TRG_FALLING,
    SP209API_TRG_CHANGE,
    SP209API_TRG_EXT_RISING,
    SP209API_TRG_EXT_FALLING
};
```


## **Structures**

### **Trigger Description (`sp209api_trigger_description_t`)**

Defines a trigger configuration.

```cpp
struct sp209api_trigger_description_t
{
    sp209api_trigger_type_t type; ///< Trigger type (rising, falling, etc.)
    int8_t channel; ///< Target channel (-1 for all channels if using logic change)
};
```

### **Device Settings (`sp209api_settings_t`)**

Defines various configurable settings for a capture session.

```cpp
struct sp209api_settings_t
{
    int64_t sampling_depth; ///< Total number of samples requested
    int64_t post_trig_depth; ///< Number of samples after the trigger
    uint32_t t_clk[SP209_TRIG_ENGINES_COUNT]; ///< Trigger clock in Hz
    sp209api_threshold_t thresh_cfg[SP209_THRESHOLDS_COUNT]; ///< Logic level thresholds
    bool ext_clk; ///< Enable external clock mode
    sp209api_clock_pol_t ext_clk_pol; ///< External clock polarity
    bool ext_trig_50r; ///< Enable 50-ohm termination for external trigger
    bool ext_trig_in[SP209_TRIG_ENGINES_COUNT]; ///< Enable external trigger input
    uint8_t ext_trig_in_polarity[SP209_TRIG_ENGINES_COUNT]; ///< External trigger edge selection
    uint8_t ext_trig_out_polarity; ///< External trigger output polarity
    uint8_t trig_order; ///< Dual trigger engine operation mode

    // Industrial version (SP209i) settings
    bool mux[SP209_CHANNELS_COUNT]; ///< Multiplexing enable for each pin
    bool can_term; ///< Enable CAN bus termination
    bool rs485_1_term; ///< Enable RS485 bus 1 termination
    bool rs485_2_term; ///< Enable RS485 bus 2 termination
};
```

### **Transition (`sp209api_trs_t`)**

Defines a signal transition.

```cpp
struct sp209api_trs_t
{
    uint8_t value; ///< Line value (logic state)
    int64_t sampple_index; ///< Sample index associated with the transition
};
```


## **Conclusion**

This document summarizes the key **defines, enumerations, and structures** used in the SP209 API. These elements provide the foundation for configuring and interacting with the SP209 logic analyzer.

