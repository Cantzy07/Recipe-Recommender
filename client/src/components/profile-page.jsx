"use client"

import { useState } from "react"
import { User, X } from "lucide-react"
import "./profile-page.css"

function AuthModal({ isSignUp, onSubmit, onToggle, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <p className="modal-subtitle">
            {isSignUp ? "Join the community and start matching!" : "Sign in to continue your journey"}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="form-button">
            {isSignUp ? "Create Account" : "Sign In"}
          </button>

          <div className="form-switch">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button type="button" onClick={onToggle}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ProfileDisplay({ user, onLogout }) {
  return (
    <div className="profile-display">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <User size={48} />
          )}
        </div>
      </div>

      <div className="profile-info">
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{user.matches}</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.likes}</span>
            <span className="stat-label">Likes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.messages}</span>
            <span className="stat-label">Messages</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-button profile-button--edit">Edit Profile</button>
          <button className="profile-button profile-button--logout" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleSignIn = () => {
    setIsSignUp(false)
    setShowAuthModal(true)
  }

  const handleSignUp = () => {
    setIsSignUp(true)
    setShowAuthModal(true)
  }

  const handleAuthSubmit = (formData) => {
    // Simulate authentication
    const newUser = {
      name: formData.name || "John Doe",
      email: formData.email,
      matches: Math.floor(Math.random() * 50) + 10,
      likes: Math.floor(Math.random() * 200) + 50,
      messages: Math.floor(Math.random() * 30) + 5,
    }

    setUserData(newUser)
    setIsSignedIn(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsSignedIn(false)
    setUserData(null)
  }

  const handleCloseModal = () => {
    setShowAuthModal(false)
  }

  const handleToggleAuthMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {isSignedIn && userData ? (
          <ProfileDisplay user={userData} onLogout={handleLogout} />
        ) : (
          <div className="auth-section">
            <h1 className="auth-title">Welcome!</h1>
            <p className="auth-subtitle">Sign in to access your profile and start connecting with others.</p>

            <div className="auth-buttons">
              <button className="auth-button auth-button--primary" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="auth-button auth-button--secondary" onClick={handleSignUp}>
                Create New Account
              </button>
            </div>
          </div>
        )}
      </div>

      {showAuthModal && (
        <AuthModal
          isSignUp={isSignUp}
          onSubmit={handleAuthSubmit}
          onToggle={handleToggleAuthMode}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
