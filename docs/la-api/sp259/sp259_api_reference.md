---
title: API Reference
sidebar_position: 2
---
# SP259 API Reference

This document details every function available in the SP259 device API. For each function, a description is provided along with its parameters and return values.

## Library Instance Management

### sp259api_create_new_handle

**Description:**  
Creates a new handle that can be later used to call the functions of this API.

**Parameters:**
- `sp259api_handle *handle`: Pointer to a handle variable where the newly created handle will be stored.
- `sp259api_model_t model`: Specifies the device model to be used when creating the handle.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code indicating the success or failure of the operation.

### sp259api_free

**Description:**  
Clears a handle by freeing all the memory used by it.

**Parameters:**
- `sp259api_handle handle`: The handle to be freed.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Device Listing Functions

### sp259api_create_device_list

**Description:**  
Creates (or updates) the list of SP259 devices that can be found on the USB.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_free_device_list

**Description:**  
Frees the memory used to store the list of current devices.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_devices_count

**Description:**  
Retrieves the number of devices that were found when the device list was created with `sp259api_create_device_list`.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint16_t *count`: Pointer to a variable where the number of devices will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_device_descriptor

**Description:**  
Obtains the device descriptor for a device on the bus. The function `sp259api_create_device_list` must be called before invoking this function. The device descriptor is required to open an SP259 device.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t device_number`: The 0-based index of the device.
- `device_descriptor_t *d`: Pointer where the device descriptor will be written (the user does not need to allocate memory for this).

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## General Device Commands

### sp259api_device_open

**Description:**  
Opens an SP259 device using a device descriptor.  
*Note:* The function comment mentions a "variant" parameter for specifying the device operation mode (to support devices with custom firmware), but in the signature only the device descriptor is provided.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `device_descriptor_t desc`: The device descriptor of the SP259 device to be opened.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_device_open_first

**Description:**  
Opens the first available SP259 device found.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_device_close

**Description:**  
Closes the currently opened SP259 device.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_fpga_version

**Description:**  
Retrieves the FPGA version of the opened SP259 device.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t *v`: Pointer to a variable where the FPGA version will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_hw_version

**Description:**  
Retrieves the hardware version of the opened SP259 device.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t *v`: Pointer to a variable where the hardware version will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_device_open_flag

**Description:**  
Returns a boolean flag indicating whether the device is open (i.e., if the connection is still active).

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will be set to `true` if the device is open.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_request_abort

**Description:**  
Requests that any pending operation be aborted. This function returns immediately without verifying whether the operation was effectively aborted.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_launch_new_capture_simple_trigger

**Description:**  
Starts a new capture of samples. Capture begins as soon as possible after the function is called. This function does not offer complex trigger options (like trigger on protocol, or multi-step trigger sequences that can only be defined via ScanaStudio for the time being).

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `sp259api_trigger_description_t trig`: The first trigger description to be used for this capture.
- `sp259api_trigger_description_t trig_b`: The second trigger description to be used for this capture.
- `sp259api_settings_t settings`: The settings to be used for the SP259 device capture.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_config_done_flag

**Description:**  
Checks if the device has finished its internal configuration after a request to launch a new capture. Although the device usually configures in a few milliseconds, this function is available for feedback and monitoring purposes.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will be set to `true` if configuration is done and `false` otherwise.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_triggered_flag

**Description:**  
Retrieves a flag indicating whether the device has triggered.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will be set to `true` if the device has triggered.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_trigger_position

**Description:**  
Gets the trigger position expressed in samples.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint64_t *trig_pos`: Pointer to a variable where the trigger position will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_available_samples

**Description:**  
Retrieves the number of samples that have been read from the device, buffered, and are ready for readout. It provides both the total available samples and the number of samples after the trigger condition.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `int64_t *total_available_samples`: Pointer to a variable to hold the total number of available samples.
- `int64_t *post_trig_samples`: Pointer to a variable to hold the number of samples captured after the trigger.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Transitions Iterator Functions

### sp259api_trs_reset

**Description:**  
Resets the transitions iterator for the specified channel. After calling this function, the next call to `trs_get_next()` will retrieve the very first transition.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel for which the iterator will be reset.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_trs_before

**Description:**  
Resets the transitions iterator for the specified channel and positions it right before the given target sample. After this call, the next call to `trs_get_next()` will retrieve the first transition occurring after `target_sample`.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `uint64_t target_sample`: The sample position before which the iterator will be reset.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_trs_get_next

**Description:**  
Advances the transition iterator for the specified channel to the next transition and writes its details into the provided structure. Prior to calling this function, the user must call either `trs_reset()` or `trs_before()`.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `sp259api_trs_t *transition_data`: Pointer to a structure where the details of the transition will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_trs_get_previous

**Description:**  
Rewinds the transition iterator for the specified channel to the previous transition and writes the details into the provided structure. This function is similar to `trs_get_next()` but in reverse.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `sp259api_trs_t *transition_data`: Pointer to a structure where the details of the transition will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_trs_is_not_last

**Description:**  
Determines whether the current transition pointed to by the iterator for the specified channel is the last transition. The output flag is set to `true` if there are further transitions available.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `bool *is_not_last_trs`: Pointer to a boolean variable that will be set to `true` if the current transition is not the last one.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Capture Status Functions

### sp259api_get_capture_done_flag

**Description:**  
Checks if the current capture is finished and all data has been retrieved from the device. In the case of an error or an aborted capture, this flag will always return `false`.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will hold the state of the `capture done` flag.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp259api_get_ready_flag

**Description:**  
Determines if the device is ready or if an operation is still in progress.

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will hold the state of the `ready` flag.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Error management

### sp259api_get_last_error

**Description:**  
Returns the last error that may have been thrown by the API’s internal threads. This can be useful for diagnosing unexpected behavior or abnormal response times (for example, if the `config_done` flag never becomes `true`).

**Parameters:**
- `sp259api_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.
