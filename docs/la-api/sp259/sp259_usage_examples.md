---
title: Usage example
sidebar_position: 3
---

# SP259 API: Usage Examples

This document provides practical **C/C++** examples demonstrating how to use the **SP259 API**.

## **Listing Available Devices**

The following example lists the number of available **SP259** devices connected via USB.

```cpp
#include <iostream>
#include "sp259api.h"

int main()
{
    sp259api_handle h;
    uint16_t devices_count = 0;

    sp259api_create_new_handle(&h, sp259api_model_t::sp259_industrial);
    sp259api_create_device_list(h);
    sp259api_get_devices_count(h, &devices_count);
    std::cout << "Number of detected devices: " << devices_count << std::endl;
    sp259api_free_device_list(h);
    sp259api_free(h);

    return 0;
}
```

## Opening a device

:::note Note
The code blow opens an SP259i (industrial 259), but you can easily make it open a standard SP209 device by replacing `sp259api_model_t::sp259_industrial` with `sp259api_model_t::sp259_standard`.
:::


```cpp
#include <iostream>
#include "sp259api.h"

int main()
{
    sp259api_handle h;
    device_descriptor_t d;
    uint16_t devices_count = 0;
    ihwapi_err_code_t e;

    sp259api_create_new_handle(&h, sp259api_model_t::sp259_industrial);
    sp259api_create_device_list(h);
    sp259api_get_devices_count(h, &devices_count);

    if (devices_count > 0)
    {
        sp259api_get_device_descriptor(h, 0, &d);
        std::cout << "Device found: SN = " << d.sn << ", Description = " << d.desc << std::endl;

        e = sp259api_device_open(h, d);
        if (e == IHWAPI_OK)
            std::cout << "Device successfully opened." << std::endl;
        else
            std::cout << "Failed to open device! Error: " << e << std::endl;
    }

    sp259api_free_device_list(h);
    sp259api_free(h);

    return 0;
}

```

## Full example (no trigger)

The following examples show how to open a seek for a device, open it, and capture some samples. Then, the first 10 transitions on channel 1 are dumped to the console. This simple example do not wait for any trigger condition, it just captures the signals once launched.

:::caution Note
Even though no trigger is needed, the function to start a capture is still called: `sp209api_launch_new_capture_simple_trigger`. The trigger configuration (or the fact that we don't need any trigger) is defined by setting the trigger type to `SP209API_TRG_NOTRIG`.
:::


```cpp

#include "sp259api.h"

void msleep(int ms)
{
    std::this_thread::sleep_for(std::chrono::milliseconds(ms));
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
    // Free the device list memory
    sp259api_free_device_list(h);

    if (e == IHWAPI_OK)
    {
        sp259api_settings_t settings;
        memset(&settings, 0, sizeof(settings));
        settings.sampling_depth = 10e6;                           // 50e6;
        settings.post_trig_depth = settings.sampling_depth * 0.9; // 5000e6; //float(settings.sampling_depth)*0.1f;
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

        int64_t total = 0;
        int64_t pre = 0;
        int64_t post = 0;

        while (post < settings.post_trig_depth)
        {
            e = sp259api_get_available_samples(h, &total, &post);
            msleep(100);

            std::cout << "retrieved transitions, pre-trig: " << pre / 1000 << +"K, post-trig:" << post / 1000 << "K" << std::endl;
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

## Adding a trigger

The example code below shows the trigger description configuration if you want to wait for a logic change on channel 1 to generate a trigger:

```cpp
sp209api_trigger_description_t trg;
trg.type = sp209api_trigger_type_t::SP209API_TRG_CHANGE;
trg.channel = 1;
```
