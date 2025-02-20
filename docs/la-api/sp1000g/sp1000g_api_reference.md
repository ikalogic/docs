---
title: API Reference
sidebar_position: 2
---
# SP1000G API Reference

This document provides detailed information on the SP1000G API functions, including their parameters, return values, and usage.

## Library Instance Management

### sp1000gapi_create_new_handle

**Description:**  
Creates a new handle that can be later used to call the functions of this API.

**Parameters:**
- `sp1000gapi_handle *handle`: Pointer to a handle variable where the newly created handle will be stored.
- `sp1000gapi_model_t model`: Specifies the device model to be used when creating the handle.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code indicating the success or failure of the operation.

### sp1000gapi_free

**Description:**  
Clears a handle by freeing all the memory used by it.

**Parameters:**
- `sp1000gapi_handle handle`: The handle to be freed.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Device Listing Functions

### sp1000gapi_create_device_list

**Description:**  
Creates (or updates) the list of SP209 devices that can be found on the USB.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_free_device_list

**Description:**  
Frees the memory used to store the list of current devices.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_devices_count

**Description:**  
Retrieves the number of devices that were found when the device list was created with `sp1000gapi_create_device_list`.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint16_t *count`: Pointer to a variable where the number of devices will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_device_descriptor

**Description:**  
Obtains the device descriptor for a device on the bus. The function `sp1000gapi_create_device_list` must be called before invoking this function. The device descriptor is required to open an SP209 device.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t device_number`: The 0-based index of the device.
- `device_descriptor_t *d`: Pointer where the device descriptor will be written (the user does not need to allocate memory for this).

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## General Device Commands (Common to All Variants)

### sp1000gapi_device_open

**Description:**  
Opens an SP209 device using a device descriptor.  
*Note:* The comment mentions a "variant" parameter for specifying the device operation mode (for devices with custom firmware), but the signature only includes the device descriptor.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `device_descriptor_t desc`: The device descriptor of the SP209 device to be opened.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_device_open_first

**Description:**  
Opens the first available SP209 device found.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_device_close

**Description:**  
Closes the currently opened SP209 device.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_fpga_version_major

**Description:**  
Retrieves the major version number of the FPGA of the opened SP209 device.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t *v`: Pointer to a variable where the major FPGA version will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_fpga_version_minor

**Description:**  
Retrieves the minor version number of the FPGA of the opened SP209 device.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t *v`: Pointer to a variable where the minor FPGA version will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_mcu_version_major

**Description:**  
Retrieves the major version number of the MCU of the opened SP209 device.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t *v`: Pointer to a variable where the major MCU version will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_mcu_version_minor

**Description:**  
Retrieves the minor version number of the MCU of the opened SP209 device.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t *v`: Pointer to a variable where the minor MCU version will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_device_open_flag

**Description:**  
Returns a boolean flag indicating whether the device is open (i.e., if the connection is still active).

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will be set to `true` if the device is open.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_request_abort

**Description:**  
Requests that any pending operation be aborted. This function returns immediately without verifying whether the operation was effectively aborted.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_launch_new_capture_simple_trigger

**Description:**  
Starts a new capture of samples. Capture begins as soon as possible after the function is called. This function does not offer any trigger options.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `sp1000gapi_trigger_description_t trig`: The first trigger description to be used for this capture.
- `sp1000gapi_trigger_description_t trig_b`: The second trigger description to be used for this capture.
- `sp1000gapi_settings_t settings`: The settings to be used for the SP209 device capture.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_config_done_flag

**Description:**  
Checks if the device has finished its internal configuration after a request to launch a new capture. Although the device usually configures in a few milliseconds, this function is mainly provided for feedback and monitoring purposes.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will be set to `true` if configuration is complete, or `false` otherwise.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_triggered_flag

**Description:**  
Retrieves a flag indicating whether the device has triggered.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will be set to `true` if the device has triggered.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_trigger_position

**Description:**  
Gets the trigger position expressed in samples.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint64_t *trig_pos`: Pointer to a variable where the trigger position will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_available_samples

**Description:**  
Retrieves the number of samples that have been read from the device, buffered, and are ready for readout. It provides both the total available samples and the number of samples captured after the trigger.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `int64_t *total_available_samples`: Pointer to a variable to hold the total number of available samples.
- `int64_t *post_trig_samples`: Pointer to a variable to hold the number of samples captured after the trigger.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Transitions Iterator Functions

### sp1000gapi_trs_reset

**Description:**  
Resets the transitions iterator for the channel with index `channel_index`. After calling this function, the next call to `trs_get_next()` will retrieve the very first transition.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel for which the iterator will be reset.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_trs_before

**Description:**  
Resets the transitions iterator for the channel with index `channel_index` and positions it right before the specified `target_sample`. After this call, the next call to `trs_get_next()` will retrieve the first transition occurring after `target_sample`.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `uint64_t target_sample`: The sample position before which the iterator will be reset.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_trs_get_next

**Description:**  
Advances the transitions iterator for the specified channel to the next transition and writes the details of that transition into `transition_data`. Prior to calling this function, the user must call either `trs_reset()` or `trs_before()`.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `sp1000gapi_trs_t *transition_data`: Pointer to a structure where the details of the transition will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_trs_get_previous

**Description:**  
Rewinds the transitions iterator for the specified channel to the previous transition and writes its details into `transition_data`.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `sp1000gapi_trs_t *transition_data`: Pointer to a structure where the details of the transition will be stored.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_trs_is_not_last

**Description:**  
Determines if the current transition pointed to by the iterator for the specified channel is not the last one. The boolean pointed to by `is_not_last_trs` is set to `true` if additional transitions are available.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `uint8_t channel_index`: The index of the channel.
- `bool *is_not_last_trs`: Pointer to a boolean variable that will be set to `true` if the current transition is not the last.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

## Capture Status Functions

### sp1000gapi_get_capture_done_flag

**Description:**  
Checks if the current capture is complete and all data has been retrieved from the device. In the case of an error or an aborted capture, this flag will always return `false`.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will hold the state of the capture done flag.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_ready_flag

**Description:**  
Checks if the device is ready or if an operation is in progress.

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.
- `bool *f`: Pointer to a boolean variable that will hold the state of the ready flag.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.

### sp1000gapi_get_last_error

**Description:**  
Returns the last error that may have been thrown by the API’s internal threads. This is useful for diagnosing unexpected behavior or abnormal response times (e.g., if the capture done flag never becomes `true`).

**Parameters:**
- `sp1000gapi_handle handle`: The handle associated with the API instance.

**Return Value:**  
Returns an `ihwapi_err_code_t` error code.
