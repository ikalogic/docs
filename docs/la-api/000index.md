---
id: la_home
title: Introduction
sidebar_position: 1
---

## Overview
The **Logic Analyzer API** (also referred to as **IHWAPI**, short for **Ikalogic Hardware API**) is a collection of libraries (**DLLs for Windows, SO files for Linux/macOS**) that allows users to interface with Ikalogic's logic analyzer devices programmatically.

:::note Note
This API is designed for seamless integration with various programming languages and environments, including **C, C++, C#, and Visual Basic**, thanks to its ABI compatibility. However, official support is currently provided only through C header files. If additional language bindings are required, we welcome feedback on possible expansions.
:::

The API maintains a consistent structure across different devices to ensure a unified experience. However, due to inherent hardware differences, some variations in functionality may exist.


## API Workflow
The typical workflow for interacting with a logic analyzer using the API follows these steps:

1. **Detect available devices** – List all connected devices on the USB bus.  
2. **Open a device** – Select and open a device from the available list.  
3. **Configure and start a capture** – Set up the analyzer and begin data acquisition.  
4. **Retrieve captured samples** – Access and process the recorded signal data.  
5. **Close the device** – (Optional) Close the device when finished.  

Closing the device after retrieving data is not mandatory. If multiple captures are needed, the device can remain open for extended use. Additionally, the API provides functions to poll the connection status, ensuring the device remains available before initiating new captures.


## Retrieving Captured Samples

As of **API version 2.0**, the sample retrieval mechanism has been redesigned to align with the **ScanaStudio scripting API**. Captured signals are stored in a **compressed format**, significantly optimizing memory usage.

Instead of storing every individual sample, only **logic transitions** are recorded. Each transition consists of:
- **Transition value** (logic level change)
- **Sample index** (position in the timeline)

![](/img/transitions.png)

### Processing Transitions
Internally, each logic channel maintains an **iterator** that retrieves stored transitions efficiently. Before reading transitions, the iterator must be reset using the appropriate API function:

```cpp
DEVICEAPI_trs_reset(); // Resets iterator to the first transition
```

Subsequently, the transitions are retrieved sequentially using:
```cpp
DEVICEAPI_trs_get_next();
```
until the last transition is reached.

:::info More about iterators
Under the hood, the API have an iterator attached to each logic channel. The job of the iterator is to fetch the logic transitions (i.e. logic change) from the compressed storage, and provide it the user of the API, in the most efficient way (offering very fast fetching with minimal memory and processor impact). As with the scripting API, the iterator for each channel needs to be reset, before it can be used to navigate to the first transition. (using the function `DEVICEAPI_trs_reset()` or `DEVICEAPI_trs_before()`, where `DEVICEAPI_` is to be replaced with your actual device api name).

Then, the proper way to retrieve captured samples is to call `DEVICEAPI_trs_next()` until the very last transition is reached for a specific channel.

:::



### Example: Retrieving Captured Samples 

The following is a example showing how to retrieve captured samples with an SP259i device (C++ Code)

```cpp

#include <thread>
#include <iostream>
#include <string.h>
#include "sp259api.h"

void msleep(int ms)
{
    std::this_thread::sleep_for(std::chrono::milliseconds(ms));
}

void assert_err(ihwapi_err_code_t e)
{
    if (e != ihwapi_err_code_t::IHWAPI_OK)
    {
        std::cout << "Error thrown by API " << uint32_t(e) << std::endl;
        throw std::runtime_error("unhandled error");
    }
}

int main(int argc, char *argv[])
{
    sp259api_handle h;
    device_descriptor_t d;
    ihwapi_err_code_t e = IHWAPI_DEVICE_NOT_OPEN;

    // Create API handle and scan for devices
    sp259api_create_new_handle(&h, sp259api_model_t::sp259_industrial);
    sp259api_create_device_list(h);
    e = sp259api_device_open_first(h);
    sp259api_free_device_list(h); 

    if (e == IHWAPI_OK)
    {
        sp259api_settings_t settings;
        memset(&settings, 0, sizeof(settings));
        settings.sampling_depth = 10e6;                           // 50e6;
        settings.post_trig_depth = settings.sampling_depth * 0.9; // 5000e6; //float(settings sampling_depth)*0.1f;
        settings.s_clk = 250e6;
        settings.state_clk_mode = sp259api_state_clk_mode_t::SCLK_DISABLE;
        settings.ext_trig_50r = false;
        for(int i=0; i<SP259_THRESHOLDS_COUNT; i++)
        {
            settings.target_vcc[i] = sp259api_target_vcc_t::SP259API_VCC_3V3;
        }
        sp259api_trigger_description_t trig_a, trig_b;
        trig_a.type = sp259api_trigger_type_t::SP259API_TRG_NOTRIG;
        trig_a.channel = -1;
        trig_b.type = sp259api_trigger_type_t::SP259API_TRG_NOTRIG;
        trig_b.channel = -1;

        e = sp259api_get_last_error(h);
        e = sp259api_launch_new_capture_simple_trigger(h, trig_a, trig_b, settings);
        e = sp259api_get_last_error(h);

        bool cfg_done = false;
        while (cfg_done == false)
        {
            e = sp259api_get_config_done_flag(h, &cfg_done);
            msleep(10);
        }
        std::cout << "cfg done!\n"
                  << std::endl;

        bool trg_flag = false;
        while (trg_flag == false)
        {
            std::cout << "Waiting for trigger" << std::endl;
            e = sp259api_get_triggered_flag(h, &trg_flag);
            msleep(100);
        }

        std::cout << "Trigged, ready for data!" << std::endl;

        int64_t total = 0; //total samples
        int64_t pre = 0; //pre trigger samples
        int64_t post = 0; //post trigger samples

        while (post < settings.post_trig_depth)
        {
            e = sp259api_get_available_samples(h, &total, &post);
            pre = total - post;
            msleep(100);

            std::cout << "retrieved transitions, pre-trig: " << pre / 1000 << +" K, post-trig:" << post / 1000 << " K" << std::endl;
        }

        const uint8_t ch = 1;
        sp259api_trs_t trs;
        sp259api_trs_reset(h, ch);
        trs.sampple_index = 0;
        bool is_not_last = true;
        int trs_count = 0;

        while (is_not_last && trs_count < 10)
        {
            sp259api_trs_get_next(h, ch, &trs);
            printf("TRS @ %lld [%d]\n", trs.sampple_index, trs.value);
            sp259api_trs_is_not_last(h, ch, &is_not_last);
            trs_count++;
        }

        e = sp259api_get_last_error(h);

        e = sp259api_request_abort(h);

        bool ready = false;
        while (!ready)
        {
            std::cout << "Waiting for abort\n"
                      << std::endl;
            msleep(100);
            e = sp259api_get_ready_flag(h, &ready);
        }

        e = sp259api_free(h);
        std::cout << "device freed\n"
                  << std::endl;

        return 0;
    }
}

```

## Header Files

To use the API, the following header files must be included in the project:

1. **`ihwapi_common_types.h`**  
   - Shared across all logic analyzer devices.  
   - Defines core types and structures used throughout the API.

2. **`*DEVICE*_types.h`**  
   - Contains **device-specific** type definitions and structures.  
   - `*DEVICE*` should be replaced with the actual device name (e.g., `sp209_types.h`).  

3. **`*DEVICE*api.h`**  
   - Declares all API functions for the specific logic analyzer model.  

## Thread Safety

Unless explicitly stated otherwise, all API functions are **thread-safe**, ensuring safe execution in **multi-threaded** environments.




:::info Disclaimer
This document assumes you have some general programming knowledge, specially in C / C++
:::