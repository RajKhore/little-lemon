# Little Lemon Restaurant - Table Reservation Web App

A modern, responsive web application for Little Lemon restaurant built with React. This application allows customers to view the restaurant menu, browse specials, and make table reservations online.

## 🎯 Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Accessibility**: Built with WCAG guidelines in mind, including proper ARIA labels, semantic HTML, and keyboard navigation
- **Form Validation**: Comprehensive client-side validation with meaningful error messages
- **Modern UI/UX**: Clean, intuitive interface with smooth transitions and hover effects
- **Unit Tests**: Comprehensive test coverage for all components

## 🛠️ Technologies Used

- **React 19.2.3**: Modern React with hooks
- **CSS3**: Custom styling with responsive design patterns
- **React Testing Library**: For unit testing components
- **Create React App**: Project scaffolding and build tools

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

## 🚀 Getting Started

### Installation

1. **Clone the repository** (or navigate to the project directory if you already have it):
   ```bash
   git clone <repository-url>
   cd little-lemon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required dependencies listed in `package.json`.

### Running the Application

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Open your browser**:
   The application will automatically open at [http://localhost:3000](http://localhost:3000)
   
   If it doesn't open automatically, manually navigate to the URL shown in your terminal.

3. **View the application**:
   - You should see the Little Lemon restaurant homepage
   - Navigate through the sections: Header, Hero, Menu, and Booking Form
   - Test the booking form with various inputs

### Running Tests

To run the test suite:

```bash
npm test
```

This will launch the test runner in interactive watch mode. Press `a` to run all tests, or `q` to quit.

To run tests in CI mode (single run):
```bash
CI=true npm test
```

### Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build is minified and ready for deployment.

## 📁 Project Structure

```
little-lemon/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── Header.js      # Navigation header
│   │   ├── Hero.js        # Hero section
│   │   ├── Menu.js        # Menu display
│   │   ├── BookingForm.js # Reservation form
│   │   ├── Footer.js      # Footer with contact info
│   │   └── __tests__/     # Component tests
│   ├── App.js             # Main app component
│   ├── App.css            # App styles
│   ├── App.test.js        # App component tests
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## ✨ Component Overview

### Header
- Restaurant branding and logo
- Navigation menu with anchor links
- Fully accessible with ARIA labels

### Hero
- Welcome message and restaurant description
- Call-to-action button linking to booking form
- Responsive layout

### Menu
- Displays featured menu items (specials)
- Shows descriptions and prices
- Grid layout that adapts to screen size

### BookingForm
- Comprehensive form with validation:
  - First name and last name (required, min 2 characters)
  - Email (required, valid format)
  - Phone number (required, valid format, min 10 digits)
  - Date (required, must be today or future)
  - Time (required, must be future if date is today)
  - Number of guests (required, 1-10)
  - Occasion (optional dropdown)
- Real-time validation with error messages
- Success confirmation after submission

### Footer
- Contact information
- Business hours
- Social media links
- Copyright information

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: #f4b400 (Golden yellow)
  - Background: #f9f9f9 (Light gray)
  - Text: #333 (Dark gray)
  
- **Typography**: System fonts with fallbacks for optimal rendering
- **Responsive Breakpoints**: 
  - Mobile: < 480px
  - Tablet: 481px - 768px
  - Desktop: > 768px

## ✅ Validation Rules

The booking form includes the following validation:

1. **First Name**: Required, minimum 2 characters
2. **Last Name**: Required, minimum 2 characters
3. **Email**: Required, valid email format
4. **Phone**: Required, valid phone format with at least 10 digits
5. **Date**: Required, must be today or a future date
6. **Time**: Required, must be in the future if the selected date is today
7. **Guests**: Required, between 1 and 10 guests

## 🧪 Testing

The project includes comprehensive unit tests for:

- All component rendering
- Form validation logic
- Accessibility attributes
- User interactions

Test files are located in `src/components/__tests__/` and follow the naming convention `ComponentName.test.js`.

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is already in use, React will prompt you to use a different port. You can also specify a port:

```bash
PORT=3001 npm start
```

### Dependencies Installation Issues

If you encounter issues installing dependencies:

1. Delete `node_modules` folder and `package-lock.json`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall: `npm install`

### Tests Not Running

Ensure you have all dependencies installed:

```bash
npm install
```

## 📝 Code Quality

- **Comments**: All components include JSDoc-style comments
- **Accessibility**: ARIA labels and semantic HTML throughout
- **Error Handling**: Comprehensive validation and user-friendly error messages
- **Responsive Design**: Mobile-first approach with media queries

## 🚀 Deployment

To deploy this application:

1. Build the production version: `npm run build`
2. The `build` folder contains static files ready for deployment
3. Deploy to your preferred hosting service (Netlify, Vercel, AWS, etc.)

## 📄 License

This project is part of a course assignment and is for educational purposes.

## 👥 Contributing

This is a capstone project for peer review. If you're reviewing this project:

1. Clone the repository
2. Run `npm install`
3. Review the code and test the application
4. Check all criteria mentioned in the peer review rubric

## 📞 Support

For questions or issues related to this project, please refer to the course materials or contact the project maintainer.

---

**Built with ❤️ for Little Lemon Restaurant**
