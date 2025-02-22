---
id: at1000_home
title: Introduction to AT1000
sidebar_position: 1
---

# AT1000 Series API Documentation 

The **AT1000 Series** are test sequencers designed to help engineers quickly set up a functional test sequence for a device, a PCB (printed circuit board) or a more complex system testing, involving:
- Digital and Analog I/Os
- Current measurement
- Programmable Power Supply
- USB, CAN, Ethernet, RS232, and RS485 communication

AT1000 devices can not only test electronic boards, but can also be used to automate loading of firmware via USB ports and dedicated programming cables.


:::caution AT1032S is part of AT1000 series
For the time being, AT1000 series currently consist of only one model : **AT1032S**. Future devices may be added to the AT1000 family of test sequencers. That being said the AT1000 API will remain compatible among all AT1000 and future AT1000 devices will be designed to fully integrate with existing AT1000 devices.
:::

## AT1032S

AT1032S is the first device of the AT1000 series test sequencers.

Each AT1032S device has **32 programmable I/Os**, capable of handling both analog and digital signals within a ±25V range. Outputs support **0 to 25V** operation (negative voltages cannot be generated). Also, each device has **8 dry contacts** including one dry contact with high precision current measurement. Multiple devices can be **daisy-chained** for expanded I/O capability.

### AT1032S Key Features
- 32 Analog / Digital I/Os
- 8 Dry Contacts (including 1 contact equipped with high precision, bidirectional current measurement)
- 1 two-amps, 0 to 24V power supply with precise current measurement
- 2 USB-3 ports with precise current measurement and power ON/OFF (USB power cycling)
- 1 100base-T ethernet port
- Synchronization across multiple devices using `SYNC IN` / `SYNC OUT`
- JavaScript and Python APIs for test automation

:::tip

This documentation focuses on the JavaScript / Python API and provides step-by-step methodology to setup a functional test sequencer using an AT1000. This is not a detailed datasheet for the AT1000 device.

:::

## Terminology

The following terminology is used all along this documentation

* DUT: Device Under Test
* Tester : individual AT1000 device.
* Rank (Device rank) : When several AT1000 device are daisy-chained, the rank is the device number in the chain (0 being the rank of the master, first slave is 1, and so forth.)

:::info Disclaimer
This document assumes you have some general programming knowledge, specially in one of the following programming languages: JavaScript (NodeJS) or Python.
:::