# Blog App - React + Vite + TailwindCSS

A responsive blog web application built with React, Vite, and TailwindCSS, featuring a mobile-first design and full CRUD functionality for managing blog posts.

## Features

### 🏠 Main Page (Home)
- Displays "Posts" title at the top
- Fetches blog posts from API endpoint: `GET http://localhost:5000/api/posts`
- Each post shows title, image, and short description
- Clicking a post opens a Single Post page with full content
- Includes "Buy Me a Coffee" buttons for support

### 🛠️ Admin Panel (`/admin`)
- **Create new post**: `POST http://localhost:5000/api/posts`
  - Fields: title, image (upload), content (rich text with formatting)
- **Edit post**: `PUT http://localhost:5000/api/posts/:id`
- **Delete post**: `DELETE http://localhost:5000/api/posts/:id`
- **Image upload**: `POST http://localhost:5000/api/upload`
- Uploaded image preview before saving
- Rich Text Editor component for content formatting

### ℹ️ About Page
- Attractive design describing the blog/author
- "My Portfolio" button linking to external portfolio URL

### 📱 General Features
- Mobile-first responsive design using TailwindCSS
- React Router for navigation between pages
- Reusable components (PostCard, Button, Input, RichTextEditor, ImageUploader)
- Connected to localhost API endpoints for easy backend integration
- Comprehensive error handling and loading states

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Rich Text Editor**: React Quill
- **Icons**: Heroicons (via SVG)

## Project Structure

```
blog-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── Input.jsx           # Reusable input component
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── PostCard.jsx        # Blog post card component
│   │   ├── RichTextEditor.jsx  # Rich text editor component
│   │   └── ImageUploader.jsx   # Image upload component
│   ├── pages/
│   │   ├── Home.jsx            # Main page with posts list
│   │   ├── About.jsx           # About page
│   │   ├── Admin.jsx           # Admin panel for CRUD operations
│   │   └── SinglePost.jsx      # Individual post view
│   ├── services/
│   │   └── api.js              # API service functions
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles and TailwindCSS
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## API Endpoints

The application expects the following API endpoints to be available at `http://localhost:5000/api`:

- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch single post by ID
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update existing post
- `DELETE /posts/:id` - Delete post
- `POST /upload` - Upload image file

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the project files, navigate to the directory
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Backend API
The application is configured to connect to `http://localhost:5000/api`. To change this:

1. Open `src/services/api.js`
2. Update the `API_BASE_URL` constant
3. Restart the development server

### Customization

#### Buy Me a Coffee Link
Update the Buy Me a Coffee links in:
- `src/pages/Home.jsx` (line ~35)
- `src/pages/SinglePost.jsx` (line ~35)

#### Portfolio Link
Update the portfolio link in:
- `src/pages/About.jsx` (line ~7)

#### Styling
The application uses TailwindCSS with custom color schemes. Modify `tailwind.config.js` to change:
- Primary colors
- Font families
- Custom spacing/sizing

## Features in Detail

### Responsive Design
- Mobile-first approach with responsive breakpoints
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-friendly interface elements

### Rich Text Editor
- Powered by React Quill
- Supports: bold, italic, strikethrough, headings, lists, colors, alignment, links, images
- Custom styling for better integration

### Image Upload
- Drag and drop or click to select
- File type validation (images only)
- File size validation (max 5MB)
- Preview before upload
- Error handling for failed uploads

### Error Handling
- Comprehensive error states for all API calls
- User-friendly error messages
- Retry functionality for failed requests
- Loading states for better UX

### Navigation
- Responsive navigation with mobile hamburger menu
- Active state indicators
- Smooth transitions and hover effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the browser console for error messages
2. Ensure your backend API is running on `http://localhost:5000`
3. Verify all dependencies are installed correctly
4. Check that all API endpoints are properly implemented

---

**Note**: This is a frontend-only application. You'll need to implement the backend API endpoints to make it fully functional. The API endpoints are designed to be easily replaceable with your preferred backend technology.
