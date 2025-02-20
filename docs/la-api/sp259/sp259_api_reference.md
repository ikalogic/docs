---
title: API Reference
sidebar_position: 2
---
# SP259 API Reference

## **Library Instance Management**

### `sp259api_create_new_handle`
Creates a new API handle.

```cpp
ihwapi_err_code_t sp259api_create_new_handle(sp259api_handle *handle, sp259api_model_t model);
```
#### **Parameters**
- `handle` - Pointer to a variable where the newly created API handle will be stored.
- `model` - Specifies the SP259 device model.

#### **Returns**
- `IHWAPI_OK` if successful.
- An error code if the operation fails.

### `sp259api_free`
Frees the API handle and releases allocated memory.

```cpp
ihwapi_err_code_t sp259api_free(sp259api_handle handle);
```
#### **Parameters**
- `handle` - The API handle to be freed.

#### **Returns**
- `IHWAPI_OK` if successful.
- An error code if the operation fails.

## **Device Listing Functions**

### `sp259api_create_device_list`
Scans for available devices.

```cpp
ihwapi_err_code_t sp259api_create_device_list(sp259api_handle handle);
```
#### **Parameters**
- `handle` - The API handle.

#### **Returns**
- `IHWAPI_OK` if successful.
- An error code if the operation fails.

### `sp259api_free_device_list`
Frees the memory allocated for the list of devices.

```cpp
ihwapi_err_code_t sp259api_free_device_list(sp259api_handle handle);
```
#### **Parameters**
- `handle` - The API handle.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_get_devices_count`
Retrieves the number of detected devices.

```cpp
ihwapi_err_code_t sp259api_get_devices_count(sp259api_handle handle, uint16_t *count);
```
#### **Parameters**
- `handle` - The API handle.
- `count` - Pointer to store the number of detected devices.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_get_device_descriptor`
Gets the descriptor of a device.

```cpp
ihwapi_err_code_t sp259api_get_device_descriptor(sp259api_handle handle, uint8_t device_number, device_descriptor_t *d);
```
#### **Parameters**
- `handle` - The API handle.
- `device_number` - The index of the device in the list.
- `d` - Pointer to store the device descriptor.

#### **Returns**
- `IHWAPI_OK` if successful.

## **Device Operations**

### `sp259api_device_open`
Opens an SP259 device.

```cpp
ihwapi_err_code_t sp259api_device_open(sp259api_handle handle, device_descriptor_t desc);
```
#### **Parameters**
- `handle` - The API handle.
- `desc` - The device descriptor.

#### **Returns**
- `IHWAPI_OK` if the device is successfully opened.

### `sp259api_device_open_first`
Opens the first available SP259 device.

```cpp
ihwapi_err_code_t sp259api_device_open_first(sp259api_handle handle);
```
#### **Parameters**
- `handle` - The API handle.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_device_close`
Closes an open SP259 device.

```cpp
ihwapi_err_code_t sp259api_device_close(sp259api_handle handle);
```
#### **Parameters**
- `handle` - The API handle.

#### **Returns**
- `IHWAPI_OK` if successful.

## **Capture and Data Retrieval**

### `sp259api_launch_new_capture_simple_trigger`
Starts a new capture session.

```cpp
ihwapi_err_code_t sp259api_launch_new_capture_simple_trigger(sp259api_handle handle, sp259api_trigger_description_t trig, sp259api_trigger_description_t trig_b, sp259api_settings_t settings);
```
#### **Parameters**
- `handle` - The API handle.
- `trig` - The first trigger configuration.
- `trig_b` - The second trigger configuration.
- `settings` - The capture settings.

#### **Returns**
- `IHWAPI_OK` if the capture session is started successfully.

### `sp259api_get_config_done_flag`
Checks if device configuration is completed.

```cpp
ihwapi_err_code_t sp259api_get_config_done_flag(sp259api_handle handle, bool *f);
```
#### **Parameters**
- `handle` - The API handle.
- `f` - Pointer to store the configuration status.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_get_triggered_flag`
Checks if a trigger event has occurred.

```cpp
ihwapi_err_code_t sp259api_get_triggered_flag(sp259api_handle handle, bool *f);
```
#### **Parameters**
- `handle` - The API handle.
- `f` - Pointer to store the trigger flag status.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_get_trigger_position`
Retrieves the trigger position in samples.

```cpp
ihwapi_err_code_t sp259api_get_trigger_position(sp259api_handle handle, uint64_t *trig_pos);
```
#### **Parameters**
- `handle` - The API handle.
- `trig_pos` - Pointer to store the trigger position.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_get_available_samples`
Gets the number of captured samples.

```cpp
ihwapi_err_code_t sp259api_get_available_samples(sp259api_handle handle, int64_t *total_available_samples, int64_t *post_trig_samples);
```
#### **Parameters**
- `handle` - The API handle.
- `total_available_samples` - Pointer to store the total samples count.
- `post_trig_samples` - Pointer to store post-trigger sample count.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_trs_get_next`
Gets the next logic transition for a channel.

```cpp
ihwapi_err_code_t sp259api_trs_get_next(sp259api_handle handle, uint8_t channel_index, sp259api_trs_t *transition_data);
```
#### **Parameters**
- `handle` - The API handle.
- `channel_index` - The channel index.
- `transition_data` - Pointer to store transition data.

#### **Returns**
- `IHWAPI_OK` if successful.

### `sp259api_get_last_error`
Retrieves the last error thrown by the API.

```cpp
ihwapi_err_code_t sp259api_get_last_error(sp259api_handle handle);
```
#### **Parameters**
- `handle` - The API handle.

#### **Returns**
- The last error code.

