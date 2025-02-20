---
title: Usage example
sidebar_position: 3
---

# SP209 API Usage Examples

## Listing Available Devices

```cpp
device_descriptor_t* devices;
uint16_t device_count = 0;

sp209api_create_device_list(handle);
sp209api_get_devices_count(handle, &device_count);

for (uint8_t i = 0; i < device_count; i++) {
    sp209api_get_device_descriptor(handle, i, &devices[i]);
    printf("Device %d: Serial: %s, Description: %s\n", i, devices[i].sn, devices[i].desc);
}
```

## Opening a device

:::note Note
The code blow opens an SP209i (industrial 2029), but you can easily make it open a standard SP209 device by replacing `sp209api_device_model_t::SP209API_MODEL_209I` with `sp209api_device_model_t::SP209API_MODEL_209`.
:::


```cpp
sp209api_handle h;
device_descriptor_t d;
int devices_count = 0;
ihwapi_err_code_t e;

// Create a new API handle
sp209api_create_new_handle(&h, sp209api_device_model_t::SP209API_MODEL_209I);

// Scan for available devices
sp209api_create_device_list(h);
sp209api_get_devices_count(h, &devices_count);

printf("Found %d devices\n", devices_count);

if (devices_count > 0)
{
    // Retrieve the first device descriptor
    sp209api_get_device_descriptor(h, 0, &d);
    printf("New device, serial number = %s, description = %s\n", d.sn, d.desc);

    // Open the device
    e = sp209api_device_open(h, d, SP209API_VARIANT_STD);
    if (e == IHWAPI_OK)
    {
        printf("Device is open\n");
    }
    else
    {
        printf("Device not open! Error code = %d\n", e);
    }
}

// Clean up
sp209api_free_device_list(h);
sp209api_free(h);
```

## Full example (no trigger)

The following examples show how to open a seek for a device, open it, and capture some samples. Then, the first 10 transitions on channel 1 are dumped to the console. This simple example do not wait for any trigger condition, it just captures the signals once launched.

:::caution Note
Even though no trigger is needed, the function to start a capture is still called: `sp209api_launch_new_capture_simple_trigger`. The trigger configuration (or the fact that we don't need any trigger) is defined by setting the trigger type to `SP209API_TRG_NOTRIG`.
:::


```cpp
int main()
{
    sp209api_handle h;
    device_descriptor_t d;
    ihwapi_err_code_t e = IHWAPI_DEVICE_NOT_OPEN;
    sp209api_settings_t settings;
    uint16_t devices_count = 0;
    int64_t samples_count = 0;
    int64_t post_trig_samples = 0;
    sp209api_trs_t trs;

    // Create API handle and scan for devices
    sp209api_create_new_handle(&h, sp209api_device_model_t::SP209API_MODEL_209I);
    sp209api_create_device_list(h);
    sp209api_get_devices_count(h, &devices_count);
    printf("Found %d devices\n", devices_count);

    if (devices_count > 0)
    {
        // Retrieve and open the first device
        sp209api_get_device_descriptor(h, 0, &d);
        printf("New device, serial number = %s, description = %s\n", d.sn, d.desc);
        e = sp209api_device_open(h, d, SP209API_VARIANT_STD);

        if (e == IHWAPI_OK)
        {
            printf("Device is open\n");
        }
        else
        {
            printf("Device not open! Error code = %d\n", e);
        }
    }

    // Free the device list memory
    sp209api_free_device_list(h);

    if (e == IHWAPI_OK)
    {
        // Configure capture settings
        memset(&settings, 0, sizeof(settings));
        settings.sampling_depth = 250e3;
        settings.post_trig_depth = settings.sampling_depth * 0.9;
        settings.thresh_cfg[0] = SP209API_X_TH_3V3;
        settings.thresh_cfg[1] = SP209API_X_TH_3V3;
        settings.thresh_cfg[2] = SP209API_X_TH_3V3;

        // Configure trigger
        sp209api_trigger_description_t trg;
        trg.type = SP209API_TRG_NOTRIG;
        trg.channel = 1;

        e = sp209api_launch_new_capture_simple_trigger(h, trg, settings);
        bool cfg_done = false;

        if (e == IHWAPI_OK)
        {
            while (!cfg_done)
            {
                sp209api_get_config_done_flag(h, &cfg_done);
                msleep(200);
            }
            printf("Device Config done, new capture launched\n");
        }
        else
        {
            printf("Launch New capture error = %d\n", e);
        }
    }

    if (e == IHWAPI_OK)
    {
        // Wait for trigger event
        printf("Waiting for trigger...\n");
        bool trig_flag = false;

        while (!trig_flag)
        {
            sp209api_get_triggered_flag(h, &trig_flag);
            msleep(200);
        }

        printf("Triggered!\n");

        // Wait for capture to complete
        bool capt_done = false;
        while (!capt_done)
        {
            sp209api_get_capture_done_flag(h, &capt_done);
            msleep(200);
        }

        // Retrieve and display transitions
        const uint8_t ch = 1;
        sp209api_get_available_samples(h, &samples_count, &post_trig_samples);
        sp209api_trs_reset(h, ch);
        trs.sampple_index = 0;

        printf("Capture done, total captured samples = %lld\n", samples_count);
        bool is_not_last = true;
        int trs_count = 0;

        while (is_not_last && trs_count < 10)
        {
            sp209api_trs_get_next(h, ch, &trs);
            printf("TRS @ %lld [%d]\n", trs.sampple_index, trs.value);
            sp209api_trs_is_not_last(h, ch, &is_not_last);
            trs_count++;
        }
    }

    if (e == IHWAPI_OK)
    {
        printf("Closing device\n");
        sp209api_device_power_off(h);
    }

    // Free API handle
    sp209api_free(h);
    printf("Done\n");

    return 0;
}

```

## Adding a trigger

The example code below shows the trigger description configuration if you want to wait for a logic change on channel 1 to generate a trigger:

```cpp
sp209api_trigger_description_t trg;
trg.type = sp209api_trigger_type_t::SP209API_TRG_CHANGE;
trg.channel = 1;
```
