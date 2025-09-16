# 🎉 Happy Birthday React App

A beautiful, interactive birthday animation website converted from vanilla HTML/CSS/JS to React with modern technologies.

## ✨ Features

- **🎭 GSAP Animations**: Smooth, professional animations using GreenSock
- **🎵 Background Music**: Optional music playback with user permission
- **🎈 3D Balloon Effects**: Animated balloons with hover effects and rotation
- **🎨 Tailwind CSS**: Modern, responsive styling with utility classes
- **🔄 Swiper.js**: 3D background effects and interactions
- **🎯 shadcn/ui**: Beautiful, accessible UI components
- **📱 Responsive Design**: Works perfectly on all device sizes
- **🎪 Interactive Elements**: Click to replay animations

## 🚀 Technologies Used

- **React 19** - Modern React with latest features
- **Next.js 15** - Full-stack React framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **GSAP** - Professional animation library
- **Swiper.js** - Modern slider with 3D effects
- **SweetAlert2** - Beautiful alert dialogs
- **shadcn/ui** - High-quality React components

## 🛠️ Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd bday
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
bday/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with Tailwind
│   │   ├── layout.js        # Root layout component
│   │   └── page.js          # Main page component
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.jsx   # shadcn/ui Button component
│   │   └── BirthdayAnimation.jsx  # Main birthday animation
│   └── lib/
│       └── utils.js         # Utility functions
├── public/
│   ├── assets/              # Images and SVGs
│   └── music/               # Audio files
└── package.json
```

## 🎨 Key Components

### BirthdayAnimation.jsx
The main component that handles:
- GSAP animation timeline
- Swiper.js 3D background effects
- Music playback with user permission
- Interactive replay functionality

### UI Components
- **Button**: Custom shadcn/ui button with variants
- **Responsive Design**: Mobile-first approach with Tailwind

## 🎪 Animation Features

1. **Text Animations**: Character-by-character text reveals
2. **3D Transforms**: Rotations, scales, and skews
3. **Staggered Effects**: Sequential element animations
4. **Interactive Elements**: Hover effects and transitions
5. **Background Effects**: Swiper.js powered 3D backgrounds

## 🎵 Audio Integration

- Optional background music with user permission
- SweetAlert2 for music permission dialog
- Graceful fallback if audio is declined

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts for all screen sizes
- Optimized animations for different devices
- Touch-friendly interactive elements

## 🚀 Deployment

The app is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

## 🎯 Customization

You can easily customize:
- **Name**: Change "Irene" to any name
- **Colors**: Modify Tailwind classes for different color schemes
- **Images**: Replace profile picture and assets
- **Music**: Add your own audio file
- **Text**: Update birthday messages and greetings

## 🛠️ Development

- **Hot Reload**: Changes reflect immediately
- **ESLint**: Code linting and formatting
- **TypeScript Ready**: Easy to convert to TypeScript if needed

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Birthday! 🎉** Enjoy your beautiful, interactive birthday animation!