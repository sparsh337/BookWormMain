import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Mail, BookOpen, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <div className="logo cursor-pointer">
                        <BookOpen size={24} />
                        <span>BookWorm</span>
                    </div>
                    <p className="footer-tagline">Virtually yours, for the love of literature and art.</p>
                </div>

                <div className="footer-links">
                    <h3>Explore</h3>
                    <Link to="/products" className="footer-link">Browse Books</Link>
                    <Link to="/membership" className="footer-link">Membership Plans</Link>
                </div>

                <div className="footer-links">
                    <h3>Company</h3>
                    <a href="/about-us" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <Info size={16} /> About Us
                    </a>
                    <a href="/contact-us" target="_blank" rel="noopener noreferrer" className="footer-link">
                        <Mail size={16} /> Contact Us
                    </a>
                </div>

                <div className="footer-social">
                    <h3>Connect</h3>
                    <div className="social-icons">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Github size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} BookWorm. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
