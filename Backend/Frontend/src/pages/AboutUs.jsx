import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const teamMembers = [
    {
        name: 'Tushar Gupta',
        role: 'Team leader',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/leader_jayant.jpg'
    },
    {
        name: 'Sparsh Doshi',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member1_ananya.jpg'
    },
    {
        name: 'Ronak Kulkarni',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member2_rohan.jpg'
    },
    {
        name: 'Shyamali Umak',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member3_priya.jpg'
    },
    {
        name: 'Madhura Chaudhari',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member4_vikram.jpg'
    },
    {
        name: 'Kovid Saxena',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member5_neha.jpg'
    },
    {
        name: 'Om Borade',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member6_sameer.jpg'
    },
    {
        name: 'Prathamesh Shirke',
        role: 'team member',
        bio: 'SMVITA,MUMBAI',
        image: '/assets/team/member7_aditi.jpg'
    }
];

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us | BookWorm";
    }, []);

    return (
        <div className="about-us-page min-h-screen pb-20">
            <Navbar />
            <section className="about-hero">
                <div className="container">
                    <h1>Welcome to BookWorm</h1>
                    <p className="lead">Virtually yours, for the love of literature and art.</p>
                </div>
            </section>

            <section className="about-mission container">
                {/* <div className="mission-content">
                    <h2>Our Story</h2>
                    <p>
                        Bookworm is a newly founded organization established by a group of literature and performing art lovers.
                        Based on the concept of a <strong>virtual bookshop</strong>, we allow users to buy, store, and read books online.
                    </p>
                    <p>
                        We don't just restrict ourselves to books. Our platform showcases music albums and films
                        (including short films and documentaries), all provided in high-quality digital formats.
                        Our mission is to cater to every need of the modern virtual shop enthusiast.
                    </p>
                </div> */}
                <div className="mission-content">
                    <h2>Our Story</h2>
                    <p>
                        Bookworm is a digital platform developed as a project with the aim of providing users access<br></br> to
                        <strong> E-books and Audiobooks </strong> through a modern virtual library experience.
                    </p>
                    <p>
                        The platform allows users to explore, access, and manage digital reading and listening content <br></br> online,
                        offering a convenient and user-friendly alternative to traditional physical books.<br></br>
                        Bookworm focuses solely on digital literature to make learning and reading more accessible.
                    </p>
                </div>

            </section>

            <section className="team-section container">
                <h2>Meet Our Team</h2>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card">
                            <div className="image-wrapper">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    onError={(e) => {
                                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(member.name) + "&size=256&background=6366f1&color=fff";
                                    }}
                                />
                            </div>
                            <h3>{member.name}</h3>
                            <p className="role">{member.role}</p>
                            <p className="bio">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
