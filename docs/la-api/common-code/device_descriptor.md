---
title: Device Descriptor
sidebar_position: 2
---

# Device Descriptor 

The `device_descriptor_t` struct represents a logic analyzer device detected by the API. It provides basic information such as the device serial number and a descriptive string.

## **Struct Definition**

```cpp
/**
 * @brief The device_descriptor_t struct defines any device detected by the API
 */
struct device_descriptor_t
{
    /**
     * @brief sn pointer to Null terminated string for the serial number
     */
    char* sn;

    /**
     * @brief desc pointer to Null terminated string for the description of the device
     */
    char* desc;
};
```

## **Field Descriptions**

| Field  | Type    | Description |
|--------|--------|-------------|
| `sn`   | `char*` | Null-terminated string containing the device's serial number |
| `desc` | `char*` | Null-terminated string containing a human-readable description of the device |

## **Usage Example**

The following example demonstrates how to list all connected devices and print their descriptors:

```cpp
device_descriptor_t* devices;
uint16_t device_count = 0;

// Create a list of available devices
ihwapi_err_code_t status = sp209api_create_device_list(handle);

if (status == IHWAPI_OK) {
    sp209api_get_devices_count(handle, &device_count);
    printf("Number of devices found: %d\n", device_count);

    for (uint8_t i = 0; i < device_count; i++) {
        sp209api_get_device_descriptor(handle, i, &devices[i]);
        printf("Device %d: Serial Number: %s, Description: %s\n", i, devices[i].sn, devices[i].desc);
    }
} else {
    printf("Failed to create device list. Error code: %d\n", status);
}
```

## **Conclusion**

The `device_descriptor_t` struct is a fundamental part of the API, allowing users to enumerate available logic analyzers and retrieve essential device information.