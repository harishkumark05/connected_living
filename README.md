# Angular Sensor Monitoring App

This Angular application serves as the frontend for a sensor data monitoring system. It communicates with the backend server to display real-time sensor data and provides user authentication features.

## Features
- Displays real-time sensor data from the backend server.
- Utilizes Chart.js to visualize sensor data trends with interactive charts.
- Implements Animate on Scroll (AOS) for smooth animations while scrolling.
- Integrates Socket.IO for real-time communication with the backend server.


# Components and Services
- `sensor-data.component`: Component responsible for displaying real-time sensor data.
- `authentication.service`: Service for handling user authentication and JWT token management.
- `chart.component`: Component for rendering interactive charts using Chart.js.

## Dependencies Used
- Angular: Frontend framework for building web applications.
- Angular Material: UI component library for Angular applications.
- RxJS: Library for reactive programming using Observables.
- Chart.js: Library for creating interactive charts.
- AOS: Library for animating elements on scroll.
- Socket.IO: Library for real-time, bidirectional communication between web clients and servers.
