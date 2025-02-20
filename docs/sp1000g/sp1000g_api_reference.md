---
title: API Reference
sidebar_position: 2
---
# SP1000G API Reference

This document provides detailed information on the SP1000G API functions, including their parameters, return values, and usage.

## **Handle Management**

### `sp1000gapi_create_new_handle`
Creates a new handle used to interact with the API.

```cpp
ihwapi_err_code_t sp1000gapi_create_new_handle(sp1000gapi_handle *handle, sp1000gapi_model_t model);
```

- **`handle`** (output) – Pointer to the newly created API handle.
- **`model`** – The model of the SP1000G device.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_free`
Releases the memory used by an API handle.

```cpp
ihwapi_err_code_t sp1000gapi_free(sp1000gapi_handle handle);
```

- **`handle`** – The handle to free.
- **Returns** – `IHWAPI_OK` if successful.

## **Device Listing**

### `sp1000gapi_create_device_list`
Scans and updates the list of available SP1000G devices.

```cpp
ihwapi_err_code_t sp1000gapi_create_device_list(sp1000gapi_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_get_devices_count`
Retrieves the number of detected devices.

```cpp
ihwapi_err_code_t sp1000gapi_get_devices_count(sp1000gapi_handle handle, uint16_t *count);
```

- **`handle`** – The API handle.
- **`count`** (output) – Pointer to store the device count.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_get_device_descriptor`
Retrieves the descriptor of a specific device.

```cpp
ihwapi_err_code_t sp1000gapi_get_device_descriptor(sp1000gapi_handle handle, uint8_t device_number, device_descriptor_t *d);
```

- **`handle`** – The API handle.
- **`device_number`** – 0-based index of the device.
- **`d`** (output) – Pointer to the device descriptor.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_free_device_list`
Frees the memory allocated for the device list.

```cpp
ihwapi_err_code_t sp1000gapi_free_device_list(sp1000gapi_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

## **Device Control**

### `sp1000gapi_device_open`
Opens a device using its descriptor.

```cpp
ihwapi_err_code_t sp1000gapi_device_open(sp1000gapi_handle handle, device_descriptor_t desc);
```

- **`handle`** – The API handle.
- **`desc`** – The device descriptor.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_device_open_first`
Opens the first available device.

```cpp
ihwapi_err_code_t sp1000gapi_device_open_first(sp1000gapi_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_device_close`
Closes the currently open device.

```cpp
ihwapi_err_code_t sp1000gapi_device_close(sp1000gapi_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

## **Firmware Management**

### `sp1000gapi_get_fpga_version_major`
Gets the major version of the FPGA firmware.

```cpp
ihwapi_err_code_t sp1000gapi_get_fpga_version_major(sp1000gapi_handle handle, uint8_t *v);
```

- **`handle`** – The API handle.
- **`v`** (output) – Pointer to store the major version.
- **Returns** – `IHWAPI_OK` if successful.

## **Capturing Data**

### `sp1000gapi_launch_new_capture_simple_trigger`
Starts a new capture using a simple trigger.

```cpp
ihwapi_err_code_t sp1000gapi_launch_new_capture_simple_trigger(sp1000gapi_handle handle, sp1000gapi_trigger_description_t trig, sp1000gapi_trigger_description_t trig_b, sp1000gapi_settings_t settings);
```

- **`handle`** – The API handle.
- **`trig`** – The primary trigger configuration.
- **`trig_b`** – The secondary trigger configuration.
- **`settings`** – Capture settings.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_request_abort`
Aborts any ongoing operation.

```cpp
ihwapi_err_code_t sp1000gapi_request_abort(sp1000gapi_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – `IHWAPI_OK` if successful.

## **Transition Handling**

### `sp1000gapi_trs_reset`
Resets the transition iterator for a channel.

```cpp
ihwapi_err_code_t sp1000gapi_trs_reset(sp1000gapi_handle handle, uint8_t channel_index);
```

- **`handle`** – The API handle.
- **`channel_index`** – The channel index.
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_trs_get_next`
Retrieves the next transition.

```cpp
ihwapi_err_code_t sp1000gapi_trs_get_next(sp1000gapi_handle handle, uint8_t channel_index, sp1000gapi_trs_t *transition_data);
```

- **`handle`** – The API handle.
- **`channel_index`** – The channel index.
- **`transition_data`** (output) – Pointer to store transition data.
- **Returns** – `IHWAPI_OK` if successful.

## **Device Status**

### `sp1000gapi_get_ready_flag`
Checks if the device is ready.

```cpp
ihwapi_err_code_t sp1000gapi_get_ready_flag(sp1000gapi_handle handle, bool *f);
```

- **`handle`** – The API handle.
- **`f`** (output) – Pointer to store the ready flag (true if ready).
- **Returns** – `IHWAPI_OK` if successful.

### `sp1000gapi_get_last_error`
Retrieves the last error.

```cpp
ihwapi_err_code_t sp1000gapi_get_last_error(sp1000gapi_handle handle);
```

- **`handle`** – The API handle.
- **Returns** – Last error code encountered.
