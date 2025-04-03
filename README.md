# Lightweight CRM Feature

## Overview
This project is a lightweight CRM feature built using Django (backend) and Next.js (frontend). The system includes real-time updates using WebSockets and provides a simple yet effective Kanban board for managing leads.

## Features
- **Form Page**: Add or edit lead details.
- **Kanban View**: Drag-and-drop board displaying leads in different stages.
- **Real-Time Updates**: Implemented using WebSockets to ensure instant updates across all users.
- **AI Integration**: AI tools were used for code generation, debugging, and optimization.

## Tech Stack
- **Backend**: Django, Django Channels (for WebSockets), PostgreSQL
- **Frontend**: Next.js, React, Tailwind CSS, Zustand (for state management)
- **WebSockets**: Django Channels, WebSockets API
- **Database**: PostgreSQL

## Installation & Setup
### Backend (Django)
1. Clone the repository:
   ```bash
   git clone https://github.com/mostafanasser775/GENIE_TASK.git
   cd GENIE_TASK/djangoapi
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the WebSocket server:
   ```bash
   python manage.py runserver
   ```

### Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd ../GenieTask
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open `http://localhost:3000` in your browser.
2. Add new leads through the Form Page.
3. Drag and drop leads between stages in the Kanban View.
4. Experience real-time updates across multiple sessions.

## Demo Video
[Watch the demo](https://drive.google.com/file/d/1bO8GhiWne7aFZGdZJJuMFIgfnWOwgc7j/view?usp=sharing)

## AI Tools Used
- **Heroui.chat** – For generating the initial frontend code (customers & Kanban).
- **GitHub Copilot** – Assisted with Python coding, especially for WebSocket connections, as well as code optimization and debugging.

## Contribution
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any questions, reach out to [your email] or create an issue in the repository.

