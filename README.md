# Zenskar Event Calendar (Single Day)

Create a single-day calendar layout in React that visually organizes a set of events without overlap, akin to the interfaces found in Outlook, Calendar.app, and Google Calendar. Your layout must adhere to specific constraints to ensure a clean and functional user experience.

## Deployment

The application is deployed on Vercel and can be accessed [here](https://zenskar-event-calendar.vercel.app/).

# Problem Features

### Layout Constraints

Non-Overlapping Events: Design the calendar so that events do not visually overlap.

Concurrent Events Share Width: When events coincide timewise, they must be rendered with the same width to indicate their concurrency.

Maximize Width Utilization: Each event should expand to use as much width as possible, given the equal width constraint for concurrent events is met.

Valid Input Assumption: Assume all event input data is valid and free of errors.

### Event Data Structure

Represent each event with a JavaScript object containing start and end attributes, representing minutes passed since 9 AM. For example, {start: 30, end: 90} signifies an event from 9:30 AM to 10:30 AM.

### Display Container

The events must be displayed within a 620px wide container (600px for content and 10px of padding on the left and right) and 720px tall, representing a 9 AM to 9 PM schedule.

### Styling

Match the event styling to the attached design screenshot, ensuring a professional and clean aesthetic aligning with standard business applications.

### Deliverable

Submit a React application that renders the single-day event calendar, complete with the layout function and a sample dataset.

Feel free to structure your code as desired, but it should include the implementation of a function in the global namespace. This function must take an array of events and arrange them according to the outlined specifications.
