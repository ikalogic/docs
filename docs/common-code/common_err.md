---
title: Common error codes
sidebar_position: 1
---
# Common Error Codes 

The `ihwapi_err_code_t` enumeration defines error codes returned by API functions. These error codes help identify issues that may occur during device operation.

## **Enum Definition**

```cpp
enum ihwapi_err_code_t
{
    IHWAPI_OK = 0, ///< All is OK
    IHWAPI_HW_ERRORS = 1000,
    IHWAPI_NOT_SUPPORTED, ///< Unsupported command by this device
    IHWAPI_DEVICE_NOT_OPEN, ///< Device is not open
    IHWAPI_DEVICE_NOT_FOUND, ///< Device not found
    IHWAPI_INVALID_SERIAL,
    IHWAPI_INVALID_CONFIG,
    IHWAPI_INVALID_ARGUMENT, ///< One or more invalid arguments were used when calling an API function
    IHWAPI_BUSY, ///< Device is busy
    IHWAPI_ABORTED,
    IHWAPI_POWER_FAILURE, //9
    IHWAPI_PLL_FAILURE, //10
    IHWAPI_FLUSH_TIMEOUT, //11
    IHWAPI_NOT_RESPONDING, //12
    IHWAPI_NO_DATA, //13
    IHWAPI_FIRMWARE_ERROR, ///< Firmware error (invalid version or corrupted image)
    IHWAPI_FIRM_UPDT_FAILED,
    IHWAPI_DATA_NOT_ALIGNED,
    IHWAPI_DEVICE_FORGED,
    IHWAPI_HARDWARE_FAULT = 1100,
    IHWAPI_UNKNOWN_ERROR = 1999, ///< Unknown error
    IHWAPI_USB_ERRORS = 2000,
    IHWAPI_USB3_ERRORS = 3000,
    IHWAPI_NOT_IMPLEMENTED = 99998,
};
```

## **Error Code Descriptions**

| Error Code | Value | Description |
|------------|--------|-------------|
| `IHWAPI_OK` | `0` | Operation completed successfully |
| `IHWAPI_HW_ERRORS` | `1000` | General hardware error |
| `IHWAPI_NOT_SUPPORTED` | `1001` | Command not supported by this device |
| `IHWAPI_DEVICE_NOT_OPEN` | `1002` | Device is not open |
| `IHWAPI_DEVICE_NOT_FOUND` | `1003` | No device detected |
| `IHWAPI_INVALID_SERIAL` | `1004` | Invalid device serial number |
| `IHWAPI_INVALID_CONFIG` | `1005` | Invalid configuration detected |
| `IHWAPI_INVALID_ARGUMENT` | `1006` | One or more invalid arguments used |
| `IHWAPI_BUSY` | `1007` | Device is currently busy processing another command |
| `IHWAPI_ABORTED` | `1008` | Operation was aborted before completion |
| `IHWAPI_POWER_FAILURE` | `1009` | Power failure detected |
| `IHWAPI_PLL_FAILURE` | `1010` | PLL synchronization failure |
| `IHWAPI_FLUSH_TIMEOUT` | `1011` | Timeout occurred while flushing data |
| `IHWAPI_NOT_RESPONDING` | `1012` | Device is not responding |
| `IHWAPI_NO_DATA` | `1013` | No data available for retrieval |
| `IHWAPI_FIRMWARE_ERROR` | `1014` | Firmware error detected (corrupted or incompatible version) |
| `IHWAPI_FIRM_UPDT_FAILED` | `1015` | Firmware update failed |
| `IHWAPI_DATA_NOT_ALIGNED` | `1016` | Data alignment issue detected |
| `IHWAPI_DEVICE_FORGED` | `1017` | Device authenticity verification failed |
| `IHWAPI_HARDWARE_FAULT` | `1100` | Hardware fault detected |
| `IHWAPI_UNKNOWN_ERROR` | `1999` | Unknown error occurred |
| `IHWAPI_USB_ERRORS` | `2000` | Generic USB communication error |
| `IHWAPI_USB3_ERRORS` | `3000` | USB 3.0 specific communication error |
| `IHWAPI_NOT_IMPLEMENTED` | `99998` | Feature or function is not implemented |

## **Example: Handling Errors**

Proper error handling ensures robust API usage. The following example demonstrates how to check for errors when performing an API call:

```cpp
ihwapi_err_code_t status = sp209api_device_open(handle, device, SP209API_VARIANT_STD);

if (status != IHWAPI_OK) {
    printf("Error occurred: %d\n", status);
}
```

## **Conclusion**

The `ihwapi_err_code_t` enumeration provides a structured way to diagnose issues encountered while interacting with logic analyzers. Developers should use these error codes to implement proper exception handling and ensure smooth device operation.
