<img width="1466" alt="image" src="https://github.com/user-attachments/assets/31c9e4bb-6c6d-4b5f-a7b2-99ffec608195" /># Japanese Language Learning App

A full-stack MERN (MongoDB, Express, React, Node.js) application to help users learn Japanese characters (Hiragana, Katakana, Kanji) and vocabulary through interactive lessons and quizzes.

## Features

- User authentication (sign up, login, JWT-based sessions)
- Dashboard with XP and progress tracking
- Interactive quizzes for Hiragana, Katakana, Kanji, and vocabulary
- Lesson-based learning structure
- Leaderboards and user profiles
- Dark mode support
- Responsive design for all devices

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, Apollo Client
- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kritikaIS/japanese-final-app.git
   cd japanese-final-app
   ```

2. **Install dependencies:**
   ```sh
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory with your MongoDB URI and JWT secret.

4. **Run the app:**
   ```sh
   # In the project root
   npm run dev
   ```

   The app will start both the server and client.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


**Made with ❤️ by [kritikaIS](https://github.com/kritikaIS)**
