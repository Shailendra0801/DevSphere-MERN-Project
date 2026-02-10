import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { User, Settings, LogOut, ChevronDown, Code, Sun, Moon, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const isAuthenticated = !!localStorage.getItem('auth_token');
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/40'
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Profile', path: '/profile', protected: true },
    { name: 'Settings', path: '/settings', protected: true },
  ];

  const filteredNavItems = isAuthenticated ? navItems : navItems.filter(item => !item.protected);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <Link 
              to={isAuthenticated ? "/dashboard" : "/"} 
              className={styles.logoLink}
            >
              <div className={styles.logoWrapper}>
                <div className={styles.logoGradient}></div>
                <div className={styles.logoIcon}>
                  <Code className={styles.logoSvg} strokeWidth={2.5} />
                </div>
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>
                  DevSphere
                </span>
                <span className={styles.logoSubtitle}>
                  Build Better
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${location.pathname === item.path ? styles.activeNavLink : ''}`}
              >
                {item.name}
              </Link>
            ))}

            <div className={styles.actionSection}>
              <button
                onClick={toggleTheme}
                className={styles.themeToggle}
              >
                {theme === 'dark' ? <Sun className={styles.themeIcon} strokeWidth={2.5} /> : <Moon className={styles.themeIcon} strokeWidth={2.5} />}
              </button>

              {!isAuthenticated ? (
                <div className={styles.authButtons}>
                  <Link
                    to="/login"
                    className={styles.loginButton}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={styles.registerButton}
                  >
                    <span>Register</span>
                  </Link>
                </div>
              ) : (
                <div className={`${styles.userMenuContainer} user-menu-container`}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={styles.userMenuButton}
                  >
                    <div className={styles.userAvatarWrapper}>
                      <img
                        className={styles.userAvatar}
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div className={styles.onlineIndicator}></div>
                    </div>
                    <div className={styles.userInfo}>
                      <p className={styles.userName}>{user.name}</p>
                      <p className={styles.userEmail}>{user.email}</p>
                    </div>
                    <ChevronDown 
                      className={`${styles.chevron} ${isUserMenuOpen ? styles.rotated : ''}`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className={styles.userDropdown}>
                      <div className={styles.dropdownHeader}>
                        <p className={styles.dropdownUserName}>{user.name}</p>
                        <p className={styles.dropdownUserEmail}>{user.email}</p>
                      </div>
                      <div className={styles.dropdownMenu}>
                        <Link
                          to="/profile"
                          className={styles.dropdownItem}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className={styles.dropdownIcon} />
                          Your Profile
                        </Link>
                        <Link
                          to="/settings"
                          className={styles.dropdownItem}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className={styles.dropdownIcon} />
                          Settings
                        </Link>
                      </div>
                      <div className={styles.dropdownDivider}>
                        <button
                          onClick={handleLogout}
                          className={styles.logoutButton}
                        >
                          <LogOut className={styles.dropdownIcon} />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className={styles.mobileActions}>
            <button
              onClick={toggleTheme}
              className={styles.mobileThemeToggle}
            >
              {theme === 'dark' ? <Sun className={styles.mobileIcon} /> : <Moon className={styles.mobileIcon} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.menuToggle}
            >
              {isMenuOpen ? <X className={styles.mobileIcon} /> : <Menu className={styles.mobileIcon} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {isAuthenticated && (
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileUserContent}>
                  <img className={styles.mobileUserAvatar} src={user.avatar} alt={user.name} />
                  <div>
                    <p className={styles.mobileUserName}>{user.name}</p>
                    <p className={styles.mobileUserEmail}>{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.activeMobileNavLink : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className={styles.mobileAuthSection}>
                <Link
                  to="/login"
                  className={styles.mobileLoginButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={styles.mobileRegisterButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className={styles.mobileLogoutSection}>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={styles.mobileLogoutButton}
                >
                  <LogOut className={styles.mobileLogoutIcon} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;