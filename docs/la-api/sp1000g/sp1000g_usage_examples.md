---
title: Usage example
sidebar_position: 3
---


# SP1000G API: Usage Examples

This document provides example C/C++ code snippets for interacting with the **SP1000G API**.

## **Listing Connected Devices**

The following example scans for connected devices and retrieves the total number of detected devices.

```cpp
sp1000gapi_handle h;
int devices_count = 0;

sp1000gapi_create_new_handle(&h, sp1000gapi_model_t::sp1054g);
sp1000gapi_create_device_list(h);
sp1000gapi_get_devices_count(h, &devices_count);
sp1000gapi_free_device_list(h);

printf("Found %d devices\n", devices_count);
```

:::note Note
The code above is for `sp1054g` but works similarly for `sp1018g` by changing the model type accordingly.
:::


## **Retrieving Device Descriptors**

This example retrieves the serial number and description of the first detected device.

```cpp
sp1000gapi_handle h;
device_descriptor_t d;
int devices_count = 0;

sp1000gapi_create_new_handle(&h, sp1000gapi_model_t::sp1054g);
sp1000gapi_create_device_list(h);
sp1000gapi_get_devices_count(h, &devices_count);

if (devices_count > 0) {
    sp1000gapi_get_device_descriptor(h, 0, &d);
    printf("Device found: Serial = %s, Description = %s\n", d.sn, d.desc);
}

sp1000gapi_free_device_list(h);
```


## **Opening a Device**

This example attempts to open the first detected SP1000G device.

```cpp
sp1000gapi_handle h;
device_descriptor_t d;
int devices_count = 0;
ihwapi_err_code_t e;

sp1000gapi_create_new_handle(&h, sp1000gapi_model_t::sp1054g);
sp1000gapi_create_device_list(h);
sp1000gapi_get_devices_count(h, &devices_count);

printf("Found %d devices\n", devices_count);

if (devices_count > 0) {
    sp1000gapi_get_device_descriptor(h, 0, &d);
    printf("Opening device: Serial = %s, Description = %s\n", d.sn, d.desc);

    e = sp1000gapi_device_open(h, d);
    if (e == IHWAPI_OK) {
        printf("Device successfully opened\n");
    } else {
        printf("Failed to open device! Error code = %d\n", e);
    }
}

sp1000gapi_free_device_list(h);
sp1000gapi_free(h);
```


## **Capturing Samples**

The following example opens a device, starts a sample capture, and retrieves transition data.

```cpp
#include <thread>
#include <chrono>

void msleep(int ms) {
    std::this_thread::sleep_for(std::chrono::milliseconds(ms));
}

void assert_err(ihwapi_err_code_t e) {
    if (e != IHWAPI_OK) {
        printf("Error: %d\n", e);
        throw std::runtime_error("API error");
    }
}

int main() {
    sp1000gapi_handle h;
    ihwapi_err_code_t e = sp1000gapi_create_new_handle(&h, sp1000gapi_model_t::sp1054g);
    assert_err(e);

    e = sp1000gapi_create_device_list(h);
    assert_err(e);

    e = sp1000gapi_device_open_first(h);
    assert_err(e);

    printf("Device open and ready\n");

    sp1000gapi_settings_t settings = {};
    settings.s_clk = 250e6;
    settings.sampling_depth = 10e6;
    settings.post_trig_depth = settings.sampling_depth * 0.9;
    settings.thresh_capture_mv[0] = 1000;
    settings.ext_trig_out_polarity = true;

    for (int ch = 0; ch < SP1000G_CHANNELS_COUNT; ch++) {
        settings.io_type[ch] = SP1000GAPI_IO_IN;
        settings.io_pull[ch] = SP1000GAPI_PULL_DOWN;
    }

    sp1000gapi_trigger_description_t trig_a = {SP1000GAPI_TRG_NOTRIG, -1};
    sp1000gapi_trigger_description_t trig_b = {SP1000GAPI_TRG_NOTRIG, -1};

    e = sp1000gapi_launch_new_capture_simple_trigger(h, trig_a, trig_b, settings);
    assert_err(e);

    bool cfg_done = false;
    while (!cfg_done) {
        e = sp1000gapi_get_config_done_flag(h, &cfg_done);
        assert_err(e);
        msleep(10);
    }

    printf("Configuration complete, waiting for trigger\n");

    bool trg_flag = false;
    while (!trg_flag) {
        e = sp1000gapi_get_triggered_flag(h, &trg_flag);
        assert_err(e);
        msleep(100);
    }

    printf("Triggered! Retrieving data...\n");

    int64_t total_samples = 0, post_trig_samples = 0;
    while (post_trig_samples < settings.post_trig_depth) {
        e = sp1000gapi_get_available_samples(h, &total_samples, &post_trig_samples);
        assert_err(e);
        msleep(100);

        printf("Captured samples: %lld (post-trigger: %lld)\n", total_samples, post_trig_samples);
    }

    e = sp1000gapi_request_abort(h);
    assert_err(e);

    bool ready = false;
    while (!ready) {
        msleep(100);
        e = sp1000gapi_get_ready_flag(h, &ready);
        assert_err(e);
    }

    sp1000gapi_free(h);
    printf("Device freed\n");

    return 0;
}
```


## **Capturing Samples with a Trigger**

This example captures samples when a change occurs on channel 1.

```cpp
sp1000gapi_trigger_description_t trig_a = {SP1000GAPI_TRG_CHANGE, 1};
sp1000gapi_trigger_description_t trig_b = {SP1000GAPI_TRG_NOTRIG, -1};
settings.trig_order = 3; //important!
```

!:::caution Important note
It's important to set trig_order to 3 (Trigger A and B) even though we're only using one trigger engine. The reason behind that is that if trigger B is set to "NO_TRIG", it will generate a trigger instantly, so we still need to wait for trigger A (waiting for the logic change on channel 0).
:::

The complete example follows the same process as the previous **Capturing Samples** example but uses **trig_a** to define the trigger.

