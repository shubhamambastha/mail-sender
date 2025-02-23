# Email Sender

A Node.js application for sending dynamic email templates based on different types (resume, marketing, business).

## Features

- Send emails using Gmail SMTP
- Dynamic email templates based on type (resume, marketing, business)
- Customizable email content with user data
- Error handling and logging
- Unit tests for email functionality

## Technologies Used

- Node.js
- Express.js
- Nodemailer
- Jest (for testing)
- Sequelize (ORM)
- MySQL
- Swagger (API documentation)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/email-sender.git
   cd email-sender
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   GMAIL_USER=your_gmail_address@gmail.com
   GMAIL_APP_PASSWORD=your_gmail_app_password
   ```

## Configuration

1. Gmail Setup:

   - Enable 2-Step Verification for your Gmail account
   - Generate an App Password for the email-sender application
   - Use the generated App Password in the `.env` file

2. Database Setup:
   - Update the database configuration in `config/config.js`
   - Run migrations:
     ```
     npm run migrate
     ```

## Usage

1. Start the server:

   ```
   npm start
   ```

2. For development with auto-restart:

   ```
   npm run dev
   ```

3. Send an email:
   Make a POST request to `/api/send-email` with the following JSON body:
   ```json
   {
     "to": "recipient@example.com",
     "type": "resume",
     "data": {
       "name": "John Doe"
     }
   }
   ```
   Replace `"type"` with `"marketing"` or `"business"` for different email templates.

## Testing

Run the test suite:

```
npm test
```

## Project Structure

- `src/`: Source code
  - `services/`: Business logic (including emailService.js)
  - `controllers/`: Request handlers
  - `routes/`: API routes
  - `models/`: Database models
  - `middleware/`: Custom middleware
  - `__tests__/`: Test files
- `config/`: Configuration files
- `migrations/`: Database migration files

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make changes and commit: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request
