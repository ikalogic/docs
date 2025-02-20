---
title: API Reference
sidebar_position: 2
---
# SP209 API Reference


This document provides detailed information on the SP209 API functions, including their parameters, return values, and usage.

## **Handle Management**

### `sp209api_create_new_handle`
Creates a new handle that is used to interact with the API.

```cpp
ihwapi_err_code_t sp209api_create_new_handle(sp209api_handle *h, sp209api_device_model_t model);
```

- **`h`** (output) – Pointer to the newly created API handle.
- **`model`** – The model of the SP209 device.
- **Returns** – An error code of type `ihwapi_err_code_t`. `IHWAPI_OK` if successful.

### `sp209api_free`
Releases the memory used by an API handle.

```cpp
ihwapi_err_code_t sp209api_free(sp209api_handle handle);
```

- **`handle`** – The handle to free.
- **Returns** – `IHWAPI_OK` if successful.

## **Device Listing**

### `sp209api_create_device_list`
Scans and updates the list of available SP209 devices.

```cpp
ihwapi_err_code_t sp209api_create_device_list(sp209api_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_get_devices_count`
Retrieves the number of detected devices.

```cpp
ihwapi_err_code_t sp209api_get_devices_count(sp209api_handle handle, uint16_t *count);
```

- **`handle`** – The API handle.
- **`count`** (output) – Pointer to a variable that will store the device count.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_get_device_descriptor`
Retrieves the descriptor of a specific device.

```cpp
ihwapi_err_code_t sp209api_get_device_descriptor(sp209api_handle handle, uint8_t device_number, device_descriptor_t *d);
```

- **`handle`** – The API handle.
- **`device_number`** – 0-based index of the device.
- **`d`** (output) – Pointer to the device descriptor.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_free_device_list`
Frees the memory allocated for the device list.

```cpp
ihwapi_err_code_t sp209api_free_device_list(sp209api_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.


## **Device Control**

### `sp209api_device_open`
Opens a device using its descriptor.

```cpp
ihwapi_err_code_t sp209api_device_open(sp209api_handle handle, device_descriptor_t device, sp209api_variant_t variant);
```

- **`handle`** – The API handle.
- **`device`** – The device descriptor.
- **`variant`** – The firmware variant to use.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_device_open_first`
Opens the first available device.

```cpp
ihwapi_err_code_t sp209api_device_open_first(sp209api_handle handle, sp209api_variant_t variant);
```

- **`handle`** – The API handle.
- **`variant`** – The firmware variant to use.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_device_power_off`
Powers off the device.

```cpp
ihwapi_err_code_t sp209api_device_power_off(sp209api_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

## **Firmware Management**

### `sp209api_get_firmware_version_major`
Gets the major version of the firmware.

```cpp
ihwapi_err_code_t sp209api_get_firmware_version_major(sp209api_handle handle, uint8_t *v);
```

- **`handle`** – The API handle.
- **`v`** (output) – Pointer to store the major version.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_launch_fw_update`
Updates the firmware.

```cpp
ihwapi_err_code_t sp209api_launch_fw_update(sp209api_handle handle, uint8_t *fw_data, size_t fw_size, sp209api_variant_t variant);
```

- **`handle`** – The API handle.
- **`fw_data`** – Pointer to the firmware binary data.
- **`fw_size`** – Size of the firmware data in bytes.
- **`variant`** – The firmware variant.
- **Returns** – `IHWAPI_OK` if successful.

## **Capturing Data**

### `sp209api_launch_new_capture_simple_trigger`
Starts a new capture using a simple trigger.

```cpp
ihwapi_err_code_t sp209api_launch_new_capture_simple_trigger(sp209api_handle handle, sp209api_trigger_description_t trig, sp209api_settings_t settings);
```

- **`handle`** – The API handle.
- **`trig`** – The trigger configuration.
- **`settings`** – Capture settings.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_request_abort`
Aborts any ongoing operation.

```cpp
ihwapi_err_code_t sp209api_request_abort(sp209api_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_get_available_samples`
Retrieves the number of available samples.

```cpp
ihwapi_err_code_t sp209api_get_available_samples(sp209api_handle handle, int64_t *total_available_samples, int64_t *post_trig_samples);
```

- **`handle`** – The API handle.
- **`total_available_samples`** (output) – Pointer to the total available samples.
- **`post_trig_samples`** (output) – Pointer to the samples after the trigger.
- **Returns** – `IHWAPI_OK` if successful.

## **Transition Handling**

### `sp209api_trs_reset`
Resets the transition iterator for a channel.

```cpp
ihwapi_err_code_t sp209api_trs_reset(sp209api_handle handle, uint8_t channel_index);
```

- **`handle`** – The API handle.
- **`channel_index`** – The channel index.
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_trs_get_next`
Retrieves the next transition.

```cpp
ihwapi_err_code_t sp209api_trs_get_next(sp209api_handle handle, uint8_t channel_index, sp209api_trs_t *transition_data);
```

- **`handle`** – The API handle.
- **`channel_index`** – The channel index.
- **`transition_data`** (output) – Pointer to store transition data.
- **Returns** – `IHWAPI_OK` if successful.

## **Device Status**

### `sp209api_get_ready_flag`
Checks if the device is ready.

```cpp
ihwapi_err_code_t sp209api_get_ready_flag(sp209api_handle handle, bool *f);
```

- **`handle`** – The API handle.
- **`f`** (output) – Pointer to store the ready flag (true if ready).
- **Returns** – `IHWAPI_OK` if successful.

### `sp209api_get_last_error`
Retrieves the last error.

```cpp
ihwapi_err_code_t sp209api_get_last_error(sp209api_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – Last error code encountered.
