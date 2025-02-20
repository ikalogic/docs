---
id: introduction
title: Introduction
sidebar_position: 1
slug: /
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

The following is a example showing how to retrieve captured samples with an SP209 device (C Code)

```cpp
sp209api_handle h;
sp209api_trs_t trs;
int64_t post_trig_samples = 0;
int64_t samples_count = 0;
sp209api_create_new_handle(&h, SP209API_MODEL_209I);

// Note: Additional steps are required to detect, open, and configure the device
// they are omitted here for the sake of clarity.

bool capt_done = false;
while (!capt_done)
{
    sp209api_get_capture_done_flag(h, &capt_done);
    msleep(200);
}

const uint8_t ch = 1;
sp209api_get_available_samples(h, &samples_count, &post_trig_samples);
sp209api_trs_reset(h, ch);
trs.sampple_index = 0;

DBG << "Capture complete. Total samples: " << samples_count;

bool is_not_last = true;
while (is_not_last)
{
    sp209api_trs_get_next(h, ch, &trs);
    DBG << "Transition at " << trs.sampple_index << " [Value: " << int(trs.value) << "]";
    sp209api_trs_is_not_last(h, ch, &is_not_last);
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