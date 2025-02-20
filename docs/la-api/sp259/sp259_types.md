---
title: Structures, Enums, and Defines
sidebar_position: 1
---

# SP259 API Types and Structures

This document describes the **enums, structures, and defines** used in the **SP259 API**.

## **Defines**

```cpp
#define SP259_CHANNELS_COUNT (9)
#define SP259_TRIG_ENGINES_COUNT (2)
#define SP259_THRESHOLDS_COUNT (3)
#define SP259_MAX_TRIG_STEPS_COUNT (128)
```

## **Enums**

### **sp259api_target_vcc_t**
Defines supported voltage levels.

| Enum Name          | Value (mV) |
|--------------------|-----------|
| SP259API_VCC_1V2  | 1200      |
| SP259API_VCC_1V5  | 1500      |
| SP259API_VCC_1V8  | 1800      |
| SP259API_VCC_2V5  | 2500      |
| SP259API_VCC_3V3  | 3300      |
| SP259API_VCC_5V0  | 5000      |

### **sp259api_state_clk_mode_t**
Defines state clock modes.

| Enum Name     | Value | Description            |
|--------------|-------|------------------------|
| SCLK_DISABLE | 0     | Disable clock         |
| SCLK_RISING  | 1     | Rising edge clock     |
| SCLK_FALLING | 2     | Falling edge clock    |
| SCLK_DUAL    | 3     | Dual edge clock       |

### **sp259api_trigger_type_t**
Defines trigger types.

| Enum Name                | Value | Description               |
|--------------------------|-------|---------------------------|
| SP259API_TRG_NOTRIG      | 99    | No trigger                |
| SP259API_TRG_RISING      | 1     | Rising edge trigger       |
| SP259API_TRG_FALLING     | 0     | Falling edge trigger      |
| SP259API_TRG_CHANGE      | 3     | Any logic change          |
| SP259API_TRG_EXT_RISING  | 0x1F  | External rising edge      |
| SP259API_TRG_EXT_FALLING | 0x0F  | External falling edge     |

### **sp259api_model_t**
Defines available SP259 models.

| Enum Name         | Value |
|-------------------|-------|
| sp259_standard   | 361   |
| sp259_industrial | 371   |

## **Structures**

### **sp259api_trigger_description_t**
Defines a trigger configuration.

```cpp
struct sp259api_trigger_description_t {
    sp259api_trigger_type_t type; // Trigger type
    int8_t channel; // Channel number (-1 for all)
};
```

### **sp259api_settings_t**
Defines device configuration settings.

```cpp
struct sp259api_settings_t {
    int64_t sampling_depth; // Total samples
    int64_t post_trig_depth; // Post-trigger samples
    uint32_t s_clk; // Sampling clock frequency
    uint32_t t_clk[SP259_TRIG_ENGINES_COUNT]; // Trigger clock

    sp259api_target_vcc_t target_vcc[SP259_THRESHOLDS_COUNT]; // Target voltage

    sp259api_state_clk_mode_t state_clk_mode; // Clock mode
    bool ext_trig_50r;  // 50Ω input resistor for external trigger
    bool ext_trig_in_polarity[SP259_TRIG_ENGINES_COUNT];
    bool ext_trig_in_enable[SP259_TRIG_ENGINES_COUNT];
    bool ext_trig_out_polarity;

    uint8_t trig_order; // Trigger engine operation mode
};
```

### **sp259api_trs_t**
Describes a transition event.

```cpp
struct sp259api_trs_t {
    uint8_t value; // Line value
    uint64_t sampple_index; // Sample index
};
```
