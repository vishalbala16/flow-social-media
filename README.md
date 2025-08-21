
![flow-logo](https://github.com/user-attachments/assets/583b9581-06c7-42a1-807d-bbec67d91bdc)


# FLOW - Unique Social Media Platform

A beautiful, secure, and minimalistic social media platform where users can share their thoughts and connect with others in a flowing conversation.

## 🌟 Unique Features

### Visual Identity
- **Custom FLOW Logo** - Distinctive gradient "F" icon with FLOW branding
- **Purple Gradient Theme** - Unique color scheme with #667eea to #764ba2 gradients
- **Rounded Design Language** - Soft, modern UI with 12-16px border radius
- **Elevated Cards** - Subtle shadows and hover animations
- **Glass Morphism** - Backdrop blur effects and translucent surfaces

### User Experience
- **"What's flowing through your mind?"** - Unique post creation prompt
- **Flow Terminology** - Posts are part of "the flow" rather than threads
- **Smooth Animations** - Hover effects, transforms, and transitions
- **Gradient Avatars** - Beautiful rounded avatars with gradient backgrounds
- **Interactive Elements** - Buttons lift on hover with shadow effects

## 🎨 Design Philosophy

FLOW combines the best of modern social media with a unique visual identity:

- **Minimalistic** - Clean, distraction-free interface
- **Distinctive** - Purple gradient theme sets it apart
- **Accessible** - High contrast and readable typography
- **Responsive** - Works beautifully on all devices
- **Engaging** - Subtle animations enhance user interaction

## 🚀 Core Features

### Authentication & Security
- **JWT Authentication** - Secure token-based login system
- **Password Hashing** - bcrypt encryption for user security
- **Input Validation** - Server-side validation for all inputs
- **Rate Limiting** - Protection against spam and abuse
- **CORS Protection** - Secure cross-origin requests

### Social Features
- **Post Creation** - Share thoughts with 280-character limit
- **Media Upload** - Share images and videos
- **Like System** - Heart reactions with smooth animations
- **User Profiles** - Customizable profiles with bio and stats
- **Real-time Feed** - Chronological post timeline
- **Search Users** - Find and connect with other users

### Technical Excellence
- **React Frontend** - Modern component-based architecture
- **Node.js Backend** - Scalable server with Express.js
- **MongoDB Database** - Flexible document storage
- **File Upload** - Secure media handling with multer
- **Responsive Design** - Mobile-first CSS approach

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Hooks
- React Router for navigation
- Axios for API calls
- Custom CSS with CSS Variables
- Inter font family

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads
- Express Validator for input validation
- Helmet for security headers
- CORS for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Setup Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/vishalbala16/flow-social-media.git
   cd flow-social-media
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   Create `.env` file in root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flow-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start Application**
   ```bash
   # Terminal 1: Start backend
   npm run dev
   
   # Terminal 2: Start frontend
   npm run client
   ```

6. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create new post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:id` - Delete post

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:id/follow` - Follow/unfollow user
- `GET /api/users/search/:query` - Search users

## 🎨 Customization

### Color Scheme
The app uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Typography
- **Font Family:** Inter (Google Fonts)
- **Base Size:** 14px
- **Line Height:** 1.5
- **Font Weights:** 300, 400, 500, 600, 700

### Spacing System
- **XS:** 4px
- **SM:** 8px
- **MD:** 16px
- **LG:** 24px
- **XL:** 32px

## 🔒 Security Features

- **Password Encryption** - bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **Input Sanitization** - XSS protection
- **Rate Limiting** - DDoS protection
- **CORS Configuration** - Origin restrictions
- **Helmet Security** - HTTP headers protection
- **File Upload Validation** - Safe media handling

## 📱 Responsive Design

FLOW is designed mobile-first with breakpoints:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### Production Build
```bash
cd client
npm run build
```

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
```

### Deployment Options
- **Heroku** - Easy deployment with MongoDB Atlas
- **Vercel** - Frontend deployment
- **DigitalOcean** - Full-stack deployment
- **AWS** - Scalable cloud deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the code comments for implementation details

---

**FLOW** - Where thoughts flow freely and connections grow naturally. 🌊il
