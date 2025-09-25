# **App Name**: HireLogic-AI Landing Page

## Core Features:

- Theme Toggle: Allow users to switch between light and dark themes, persisting their choice using local storage. Uses CSS variables for styling.
- AI-Powered Candidate Screening Description: Clearly present AI-driven candidate screening processes.
- Contact Form: Implement a minimal contact form with name, email, and message fields.
- Login Modal: Create an accessible modal dialog for login with email and password fields.
- Signup Modal: Implement an accessible modal dialog for signup with name, email, password, and confirm password fields.
- Mobile Navigation: Collapse the navigation links into a hamburger menu on smaller screens. Maintain accessibility with aria attributes.
- Theme Preference: Start application with respect to prefers-color-scheme, defaulting to light mode

## Style Guidelines:

- Primary color: White (#FFFFFF) for the background in light mode; black (#000000) for text.
- Secondary color: Black (#000000) for the background in dark mode; white (#FFFFFF) for text.
- Accent color: Gray (#808080) for subtle highlights and borders. This maintains the monochrome theme while providing visual separation.
- Font: System fonts, prioritizing clarity and readability. Ensure ample whitespace and high contrast for accessibility.
- Use a responsive layout with grid and flexbox for flexible arrangement of content on different screen sizes. Implement a mobile-first approach.
- Since the app has a strict monochrome theme and no external assets are allowed, create all UI elements using text or pure CSS.
- Provide smooth scrolling for in-page links for better user experience