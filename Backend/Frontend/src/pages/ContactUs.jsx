import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import './ContactUs.css';

const contacts = [
    {
        name: 'Tushar Gupta',
        role: 'Founder & Team Leader',
        email: 'tushar@bookworm.com',
        phone: '+91 98765 43210',
        github: 'https://github.com/',
        image: '/assets/team/leader_jayant.jpg'
    },
    {
        name: 'Sparsh Doshi',
        role: 'Content Strategist',
        email: 'sparsh@bookworm.com',
        phone: '+91 98765 43211',
        github: 'https://github.com/',
        image: '/assets/team/member1_ananya.jpg'
    },
    {
        name: 'Ronak Kulkarni',
        role: 'Technical Head',
        email: 'ronak@bookworm.com',
        phone: '+91 98765 43212',
        github: 'https://github.com/',
        image: '/assets/team/member2_rohan.jpg'
    },
    {
        name: 'Shyamali Umak',
        role: 'Operations Manager',
        email: 'shyamali@bookworm.com',
        phone: '+91 98765 43213',
        github: 'https://github.com/',
        image: '/assets/team/member3_priya.jpg'
    },
    {
        name: 'Madhura Chaudhari',
        role: 'Creative Director',
        email: 'madhura@bookworm.com',
        phone: '+91 98765 43214',
        github: 'https://github.com/',
        image: '/assets/team/member4_vikram.jpg'
    },
    {
        name: 'Kovid Saxena',
        role: 'UX Designer',
        email: 'kovid@bookworm.com',
        phone: '+91 98765 43215',
        github: 'https://github.com/',
        image: '/assets/team/member5_neha.jpg'
    },
    {
        name: 'Om Borade',
        role: 'Marketing Head',
        email: 'om@bookworm.com',
        phone: '+91 98765 43216',
        github: 'https://github.com/',
        image: '/assets/team/member6_sameer.jpg'
    },
    {
        name: 'Prathamesh Shirke',
        role: 'Customer Success',
        email: 'prathamesh@bookworm.com',
        phone: '+91 98765 43217',
        github: 'https://github.com/',
        image: '/assets/team/member7_aditi.jpg'
    }
];

const ContactUs = () => {
    useEffect(() => {
        document.title = "Contact Us | BookWorm";
    }, []);

    return (
        <div className="contact-us-page min-h-screen pb-20">
            <Navbar />
            <section className="contact-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p className="lead">We're here to help you on your literary journey.</p>
                </div>
            </section>

            <section className="contact-info container">
                <div className="office-card">
                    <div className="card-header">
                        <MapPin size={24} />
                        <h2>Main Office</h2>
                    </div>
                    <p>Bookworm Virtual Services</p>
                    <p>SMVITA, Mumbai, Maharashtra, India</p>
                    <p className="primary-email"><Mail size={18} /> support@bookworm.com</p>
                </div>
            </section>

            <section className="team-contact container">
                <h2>Our Management Team</h2>
                <div className="contact-grid">
                    {contacts.map((contact, index) => (
                        <div key={index} className="contact-card">
                            <div className="contact-image">
                                <img
                                    src={contact.image}
                                    alt={contact.name}
                                    onError={(e) => {
                                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(contact.name) + "&size=256&background=6366f1&color=fff";
                                    }}
                                />
                            </div>
                            <div className="contact-details">
                                <h3>{contact.name}</h3>
                                <p className="role">{contact.role}</p>
                                <div className="contact-links">
                                    <a href={`mailto:${contact.email}`} className="contact-link">
                                        <Mail size={16} /> <span>{contact.email}</span>
                                    </a>
                                    <a href={`tel:${contact.phone}`} className="contact-link">
                                        <Phone size={16} /> <span>{contact.phone}</span>
                                    </a>
                                    {contact.github && (
                                        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="contact-link github-link">
                                            <Github size={16} /> <span>GitHub Profile</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
